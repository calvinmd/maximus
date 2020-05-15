module.exports = {
  bitcoin: {
    rpc: {
      host: 'http://localhost:18443',
      username: 'bitcoin_rpc_user',
      password: 'bitcoin_rpc_pass'
    },
    network: 'regtest',
    value: 1000000,
    mineBlocks: true
  },
  ethereum: {
    rpc: {
      host: 'http://localhost:8545'
    },
    value: 10000000000000000,
    metaMaskConnector: {
      port: 3333
    }
  },
  timeout: 120000 // No timeout
}
