const MEther = artifacts.require('MEther')
const MErc20 = artifacts.require('MErc20')
const DAI = artifacts.require('DAI')
const Comptroller = artifacts.require('Comptroller')
const BN = require('bn.js')

module.exports = async () => {

    try {
      const address = process.argv[4]
      const amount = process.argv[5]
      console.log(address, amount)

      const dai = await DAI.deployed()
      dai.allocateTo(address, amount)
    } catch(e) {
      console.error(e)
    }
}
