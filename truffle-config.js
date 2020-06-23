require('dotenv').config()
const { TruffleProvider } = require('@harmony-js/core')
const account_1_mnemonic = process.env.MNEMONIC
const account_1_private_key = process.env.PRIVATE_KEY
const testnet_url = process.env.TESTNET_URL
gasLimit = process.env.GAS_LIMIT
gasPrice = process.env.GAS_PRICE

module.exports = {
  networks: {
    testnet: {
      network_id: '2',
      provider: () => {
        const truffleProvider = new TruffleProvider(
            testnet_url,
            { memonic: account_1_mnemonic },
            { shardID: 0, chainId: 2 },
            { gasLimit: gasLimit, gasPrice: gasPrice},
        );
        const newAcc = truffleProvider.addByPrivateKey(account_1_private_key);
        truffleProvider.setSigner(newAcc);
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