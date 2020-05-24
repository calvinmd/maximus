const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'gaze choice announce rug buyer destroy ribbon wrap because oxygen super load'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    develop: { // default with truffle unbox is 7545, but we can use develop to test changes, ex. truffle migrate --network develop
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777",
      gasPrice: 1,
      // gas: 6700000,
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, process.env.RINKEBY_PROVIDER)
      },
      from: "0x6dF9485e903173f41B99A73981a867F9E5315DE3",
      network_id: 4,
      // gas: 4612388 // Gas limit used for deploys
    }
  },
  compilers: {
    solc: {
      version: "0.5.8",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: 'petersburg'
        // evmVersion: 'constantinople'
        // evmVersion: 'byzantium'
      },
    },
  },
};
