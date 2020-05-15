const CEther = artifacts.require('CEther')
const CErc20 = artifacts.require('CErc20')
// const Comptroller = artifacts.require('Comptroller')
// const PriceOracle = artifacts.require('PriceOracle')
// const BN = require('bn.js')

module.exports = async () => {

    try {
        // const paused = await
        const cEther = await CEther.deployed()
        const cDai = await CErc20.deployed()

        const cDaiBorrowRate = await cDai.borrowRatePerBlock()
        const cEtherBorrowRate = await cEther.borrowRatePerBlock()
        const cDaiSupplyRate = await cDai.supplyRatePerBlock()
        const cEtherSupplyRate = await cEther.supplyRatePerBlock()
        console.log('cDai borrow/supply rates: ', cDaiBorrowRate.toString(), '/', cDaiSupplyRate.toString())
        console.log('cEther borrow/supply rates: ', cEtherBorrowRate.toString(), '/', cEtherSupplyRate.toString())

        try {
            const cDaiBorrowTotal = await cDai.totalBorrows()
            const cEtherBorrowTotal = await cEther.totalBorrows()
            const cDaiSupplyTotal = await cDai.totalSupply()
            const cEtherSupplyTotal = await cEther.totalSupply()
            console.log('cDaiBorrowTotal', cDaiBorrowTotal.toString())
            console.log('cEtherBorrowTotal', cEtherBorrowTotal.toString())
            console.log('cDaiSupplyTotal', cDaiSupplyTotal.toString())
            console.log('cEtherSupplyTotal', cEtherSupplyTotal.toString())
        }
        catch (e) {console.error(e)}

        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}
