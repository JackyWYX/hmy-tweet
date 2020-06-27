let tweetRegistry

async function register(name, address) {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.register(name, address)
    return res.tx
}

async function unregister() {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.unregister()
    return res.tx
}

async function getNumberOfAccounts() {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.getNumberOfAccounts()
    return res[0]
}

async function getAddressOfName(name) {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.getAddressOfName(name)
    return res[0]
}

async function getNameOfAddress(addr) {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.getNameOfAddress(addr)
    return res[0]
}

async function getAddressOfId(id) {
    let instance = await tweetRegistry.at(process.env.REGISTRY_ACCOUNT)
    let res = await instance.getAddressOfId(id)
    return res[0]
}

module.exports = function(contractInterface) {
    tweetRegistry = contractInterface
    return {
        register,
        unregister,
        getNumberOfAccounts,
        getAddressOfName,
        getNameOfAddress,
        getAddressOfId,
    }
}

