const MEther = artifacts.require('MEther')
const MErc20 = artifacts.require('MErc20')
// const Comptroller = artifacts.require('Comptroller')
// const PriceOracle = artifacts.require('PriceOracle')
// const BN = require('bn.js')

module.exports = async () => {

    try {
        // const paused = await
        const mEther = await MEther.deployed()
        const cDai = await MErc20.deployed()

        const cDaiBorrowRate = await cDai.borrowRatePerBlock()
        const mEtherBorrowRate = await mEther.borrowRatePerBlock()
        const cDaiSupplyRate = await cDai.supplyRatePerBlock()
        const mEtherSupplyRate = await mEther.supplyRatePerBlock()
        console.log('cDai borrow/supply rates: ', cDaiBorrowRate.toString(), '/', cDaiSupplyRate.toString())
        console.log('mEther borrow/supply rates: ', mEtherBorrowRate.toString(), '/', mEtherSupplyRate.toString())

        try {
            const cDaiBorrowTotal = await cDai.totalBorrows()
            const mEtherBorrowTotal = await mEther.totalBorrows()
            const cDaiSupplyTotal = await cDai.totalSupply()
            const mEtherSupplyTotal = await mEther.totalSupply()
            console.log('cDaiBorrowTotal', cDaiBorrowTotal.toString())
            console.log('mEtherBorrowTotal', mEtherBorrowTotal.toString())
            console.log('cDaiSupplyTotal', cDaiSupplyTotal.toString())
            console.log('mEtherSupplyTotal', mEtherSupplyTotal.toString())
        }
        catch (e) {console.error(e)}

        process.exit()
    } catch (error) {
        console.log(error)
        process.exit()
    }
}
