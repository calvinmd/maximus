const MEther = artifacts.require('MEther')
const MErc20 = artifacts.require('MErc20')
const DAI = artifacts.require('DAI')
const Comptroller = artifacts.require('Comptroller')
const BN = require('bn.js')

module.exports = async () => {

    try {
        const daiWithDecimals = (daiValue) => new BN(daiValue).mul(new BN(10).pow(new BN(18)))
        const threeEthInWei = web3.utils.toWei('3', 'ether')
        const tenEthInWei = web3.utils.toWei('10', 'ether')
        const threeHundredDai = daiWithDecimals(300)
        const thirtyThousandDai = daiWithDecimals(30000)

        const accounts = await web3.eth.getAccounts()
        const lender = accounts[0]
        const lender2 = accounts[1]
        const borrower = accounts[2]

        // const mEther = await MEther.at(DeploymentInfo.Contracts.mETH)
        const mEther = await MEther.deployed()
        // const dai = await FaucetToken.at(DeploymentInfo.Contracts.DAI)
        const dai = await DAI.deployed()
        // const cDAI = await MErc20.at(DeploymentInfo.Contracts.cDAI)
        const cDAI = await MErc20.deployed()
        const comptroller = await Comptroller.at(await cDAI.comptroller())


        // Enter Markets (Executed once per deployment)
        await comptroller.enterMarkets([cDAI.address, mEther.address], {from: borrower})
        // await comptroller.enterMarkets([DeploymentInfo.Contracts.cDAI, DeploymentInfo.Contracts.mETH], {from: borrower})


        // Borrower Lend ETH
        console.log('Borrower Lend ETH Lend Workflow')
        await mEther.mint({ value:tenEthInWei, from: borrower })
        // Borrower Borrow DAI
        console.log(`cDAI Dai available: ${(await cDAI.getCash()).toString()}`)

        console.log(`Borrower Dai balance before borrowing: ${web3.utils.fromWei((await dai.balanceOf(borrower)).toString())}`)
        const borrowReceipt = await cDAI.borrow(daiWithDecimals(500), {from: borrower})
        // console.log(borrowReceipt.logs)
        console.log(`Borrower Dai balance after borrowing: ${web3.utils.fromWei((await dai.balanceOf(borrower)).toString())}`)
        console.log(`cDAI Dai available after borrowing: ${(await cDAI.getCash()).toString()}\n`)

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
