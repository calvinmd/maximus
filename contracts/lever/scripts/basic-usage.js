const CEther = artifacts.require('CEther')
const CErc20 = artifacts.require('CErc20')
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

        // const cEther = await CEther.at(DeploymentInfo.Contracts.cETH)
        const cEther = await CEther.deployed()
        // const dai = await FaucetToken.at(DeploymentInfo.Contracts.DAI)
        const dai = await DAI.deployed()
        // const cDAI = await CErc20.at(DeploymentInfo.Contracts.cDAI)
        const cDAI = await CErc20.deployed()
        const comptroller = await Comptroller.at(await cDAI.comptroller())


        // Enter Markets (Executed once per deployment)
        await comptroller.enterMarkets([cDAI.address, cEther.address], {from: borrower})
        // await comptroller.enterMarkets([DeploymentInfo.Contracts.cDAI, DeploymentInfo.Contracts.cETH], {from: borrower})


        // Lender Lend ETH
        console.log('ETH Lend Workflow')
        console.log(`ETH balance before minting: ${web3.utils.fromWei(await web3.eth.getBalance(lender))}`)
        // await cEther.mint({value: threeEthInWei})
        await cEther.mint({value: threeEthInWei, from: lender })
        console.log(`ETH balance after minting: ${web3.utils.fromWei(await web3.eth.getBalance(lender))}`)
        const underlyingBalanceEth = await cEther.balanceOfUnderlying.call(lender)
        await cEther.redeemUnderlying(underlyingBalanceEth)
        console.log(`ETH balance after redeeming underlying asset: ${web3.utils.fromWei(await web3.eth.getBalance(lender))}\n`)

        // Lender Lend DAI
        console.log('DAI Lend Workflow #1')
        await dai.allocateTo(lender, threeHundredDai)
        await dai.allocateTo(borrower, thirtyThousandDai)
        console.log(`Lender 1 Dai balance before lending: ${(web3.utils.fromWei(await dai.balanceOf(lender)).toString())}`)
        await dai.approve(cDAI.address, threeHundredDai)
        await cDAI.mint(threeHundredDai)
        console.log(`Lender 1 Dai balance after lending: ${web3.utils.fromWei((await dai.balanceOf(lender)).toString())}\n`)


        // Lender 2 Lend DAI
        console.log('DAI Lend Workflow #2')
        await dai.allocateTo(lender2, threeHundredDai, {from: lender2})
        console.log(`Lender 2 Dai balance before lending 2: ${web3.utils.fromWei((await dai.balanceOf(lender2)).toString())}`)
        await dai.approve(cDAI.address, threeHundredDai, {from: lender2})
        await cDAI.mint(threeHundredDai, {from: lender2})
        console.log(`Lender 2 Dai balance after lending 2: ${web3.utils.fromWei((await dai.balanceOf(lender2)).toString())}\n`)


        // Borrower Lend ETH
        console.log('Borrower Lend ETH Lend Workflow')
        await cEther.mint({ value:tenEthInWei, from: borrower })
        // Borrower Borrow DAI
        console.log(`cDAI Dai available: ${(await cDAI.getCash()).toString()}`)

        console.log(`Borrower Dai balance before borrowing: ${web3.utils.fromWei((await dai.balanceOf(borrower)).toString())}`)
        const borrowReceipt = await cDAI.borrow(daiWithDecimals(10), {from: borrower})
        // console.log(borrowReceipt.logs)
        console.log(`Borrower Dai balance after borrowing: ${web3.utils.fromWei((await dai.balanceOf(borrower)).toString())}`)
        console.log(`cDAI Dai available after borrowing: ${(await cDAI.getCash()).toString()}\n`)


        // Borrower Repay DAI
        console.log('DAI Repay workflow')
        await dai.approve(cDAI.address, daiWithDecimals(9999), {from: borrower})
        await dai.allocateTo(borrower, daiWithDecimals(1))
        const totalOwed = await cDAI.totalBorrowsCurrent.call()
        console.log(`Total Dai owed to the cDAI contract: ${totalOwed}`)
        const owed = await cDAI.borrowBalanceCurrent.call(borrower)
        console.log(`Borrower Dai owed to cDAI contract: ${owed}`)
        const borrowRepayReceipt = await cDAI.repayBorrow(owed, {from: borrower})
        // console.log('repaid: ', borrowRepayReceipt.logs)
        // console.log(`Borrower Dai balance after repayed: ${(await dai.balanceOf(borrower)).toString()}`)
        console.log(`cDAI Dai available after borrower repayed: ${(await cDAI.getCash()).toString()}\n`)

        // // Borrower Borrow ETH
        // console.log('Borrower Borrow ETH Workflow')
        // await cDAI.mint({ value: '1000', from: borrower })
        // // Borrower Borrow DAI
        // console.log(`Ether available: ${(await cEther.getCash()).toString()}`)

        // console.log(`Borrower Ether balance before borrowing: ${web3.utils.fromWei((await web3.eth.balanceOf(borrower)).toString())}`)
        // const borrowReceiptEther = await cEther.borrow(tenEthInWei, {from: borrower})
        // // console.log(borrowReceiptEther.logs)
        // console.log(`Borrower Ether balance after borrowing: ${web3.utils.fromWei((await web3.eth.balanceOf(borrower)).toString())}`)
        // console.log(`cEther available after borrowing: ${(await cEther.getCash()).toString()}\n`)

        // Lender Redeem Underlying
        console.log('DAI Redeem Underlying workflow')
        console.log(`Lender 1 Dai balance before redeeming underlying asset: ${web3.utils.fromWei((await dai.balanceOf(lender)).toString())}`)
        const underlyingBalanceDai = await cDAI.balanceOfUnderlying.call(lender)
        console.log(`Lender 1 underlying Dai balance: ${web3.utils.fromWei(underlyingBalanceDai)}`)
        const redeemUnderlyingReceipt = await cDAI.redeemUnderlying(underlyingBalanceDai)
        // console.log(redeemUnderlyingReceipt)
        console.log(`Lender 1 Dai balance after redeeming underlying asset: ${web3.utils.fromWei((await dai.balanceOf(lender)).toString())}`)

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
