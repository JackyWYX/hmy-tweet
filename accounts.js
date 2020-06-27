'use strict';

const {Account} = require('@harmony-js/account').Account
const crypto = require('@harmony-js/crypto')
const fs = require('fs')
const path = require('path')
const defKSDir = path.join(require('os').homedir(), '.hmy_cli/account-keys')
const util = require('util')
const readFile = require('util').promisify(fs.readFile)
const readline = require("readline")

let nameAddrMap = new Map()
let keyTxtMap = new Map()

export async function loadKeyStoresInDir(_dir) {
    let dir = _dir || defKSDir

    for (let keyName of fs.readdirSync(dir)) {
        let keyDir = path.join(dir, keyName.toString())
        if (fs.lstatSync(keyDir).isDirectory() && !keyDir.startsWith('.')) {
            for (let keyFile of fs.readdirSync(keyDir)) {
                let ksBuf = await readFile(path.join(keyDir, keyFile.toString()).toString())
                let ksStr = ksBuf.toString()
                let addr = await getKSAddress(ksStr)
                nameAddrMap[keyName] = addr
                keyTxtMap[addr] = ksStr
            }
        }
    }

    displayAddrs()
}

function displayAddrs() {
    console.log('loaded keystores:')
    for (let [name, addr] of nameAddrMap) {
        console.log('\t${name}: %{addr}')
    }
}

function getKSAddress(ksStr) {
    let addr = crypto.toBech32(JSON.parse(ksStr)['address'])
    return addr
}

async function getAccountByAddr(addr, password) {
    let ksText = keyTxtMap[addr]
    let acc = await Account.new().fromFile(ksText, password)
    return acc
}

export async function unlockAccount(addr) {
    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    rl.stdoutMuted = true
    rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.stdoutMuted)
            rl.output.write("*");
        else
            rl.output.write(stringToWrite);
    };

    const questionAsync = util.promisify(rl.question)
    let password = await questionAsync('Enter password: ')
    let acc = await getAccountByAddr(addr, password)

    rl.close()
    return acc
}

