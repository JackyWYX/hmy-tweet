require('dotenv').config()
const { TruffleProvider } = require('@harmony-js/core')
const regPrivateKey = process.env.REG_PRIVATE_KEY
const accPrivateKey = process.env.ACC_PRIVATE_KEY
const testnetURL = process.env.TESTNET_URL
gasLimit = process.env.GAS_LIMIT
gasPrice = process.env.GAS_PRICE

let args = require('minimist')(process.argv.slice(2), {
  boolean: ['account', 'registry'],
})

module.exports = {
  networks: {
    testnet: {
      network_id: '2',
      provider: () => {
        const truffleProvider = new TruffleProvider(
            testnetURL,
            { memonic: '' },
            { shardID: 0, chainId: 2 },
            { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        let accountKS = truffleProvider.addByPrivateKey(accPrivateKey)
        let registryKS = truffleProvider.addByPrivateKey(regPrivateKey)
        if (args['registry']) {
          truffleProvider.setSigner(registryKS)
        } else {
          truffleProvider.setSigner(accountKS)
        }
        return truffleProvider;
      },
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
    }
  }
}