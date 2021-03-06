const fs = require('fs')
const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider("http://localhost:8545")

const web3 = new Web3(provider)
const addresses = JSON.parse(fs.readFileSync(`./addresses.${process.env.ETH_NETWORK}.json`))
const accounts = JSON.parse(fs.readFileSync(`./accounts.json`))

const MErc20Abi = JSON.parse(fs.readFileSync('./build/contracts/MErc20.json')).abi

const address = accounts[0].account
const privateKey = accounts[0].privateKey

const cDaiInstance = new web3.eth.Contract(MErc20Abi, addresses.cDAI)

const LeverSDK = require('../sdk/node')

module.exports = async () => {

  const lever = new LeverSDK({ web3, networkId: '5777' })

  // Enter markets (allow supply / borrow actions)
  const enter = await lever.enterMarkets([addresses.mETH, addresses.cDAI], address)
  console.log(enter)

  // Lend
  const mintmEther = await lever.mintMEther(address, web3.utils.toWei('2'))
  console.log(mintmEther)

  // Lend
  const mintcToken = await lever.mintMToken(cDaiInstance, address, web3.utils.toWei('2'))
  console.log(mintcToken)

  // Borrow
  const borrow = await lever.borrowToken(lever.cTokens.cDai, address, 5)
  console.log(borrow)

  // get balance
  const balance = await lever.borrowBalanceCurrent(cDaiInstance, address)
  console.log(balance)

}
