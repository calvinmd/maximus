const fs = require('fs')
const Web3 = require('web3')
const provider = new Web3.providers.HttpProvider("http://localhost:8545")

const web3 = new Web3(provider)
const addresses = JSON.parse(fs.readFileSync(`./addresses.${process.env.ETH_NETWORK}.json`))
const accounts = JSON.parse(fs.readFileSync(`./accounts.json`))

// const cEtherAbi = JSON.parse(fs.readFileSync('./build/contracts/CEther.json')).abi
const CErc20Abi = JSON.parse(fs.readFileSync('./build/contracts/CErc20.json')).abi
// const comptrollerAbi = JSON.parse(fs.readFileSync('./build/contracts/Comptroller.json')).abi

const address = accounts[0].account
const privateKey = accounts[0].privateKey

// web3.eth.accounts.wallet.add({ address, privateKey })

// const CEther = new web3.eth.Contract(cEtherAbi, addresses.cETH)
const cDaiInstance = new web3.eth.Contract(CErc20Abi, addresses.cDAI)
// const comptroller = new web3.eth.Contract(comptrollerAbi, addresses.Comptroller)

const LeverSDK = require('../sdk/node')

module.exports = async () => {

  const lever = new LeverSDK({ web3, networkId: '5777' })

  // Enter markets (allow supply / borrow actions)
  const enter = await lever.enterMarkets([addresses.cETH, addresses.cDAI], address)
  console.log(enter)

  // Lend
  const mintcEther = await lever.mintCEther(address, web3.utils.toWei('2'))
  console.log(mintcEther)

  // Lend
  const mintcToken = await lever.mintCToken(cDaiInstance, address, web3.utils.toWei('2'))
  console.log(mintcToken)

  // Borrow
  const borrow = await lever.borrowToken(lever.cTokens.cDai, address, 5)
  console.log(borrow)

  // get balance
  const balance = await lever.borrowBalanceCurrent(cDaiInstance, address)
  console.log(balance)
  // .then(result => {
  //   dbg(result)
  //   // dbg(result.toNumber() / 1E18)
  // })

}