const CEther = artifacts.require('CEther')
const CErc20 = artifacts.require('CErc20')
const DAI = artifacts.require('DAI')
const Comptroller = artifacts.require('Comptroller')
const BN = require('bn.js')

module.exports = async () => {
    try {
      let receipt
      const daiWithDecimals = (daiValue) => new BN(daiValue).mul(new BN(10).pow(new BN(18)))
      const tenEthInWei = web3.utils.toWei('10', 'ether')
      const lendDai = daiWithDecimals(100000)

      const accounts = require('../accounts.json')

      const cEther = await CEther.deployed()
      const dai = await DAI.deployed()
      const cDai = await CErc20.deployed()
      const comptroller = await Comptroller.at(await cDai.comptroller())

      for (let i = 0; i < accounts.length; i++) {
        console.log('address: ', accounts[i])
        await dai.allocateTo(accounts[i].address, lendDai)
      }
      process.exit(0)
    } catch(e) {
      console.error(e)
      process.exit(1)
    }
}
