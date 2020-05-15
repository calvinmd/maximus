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
        await cEther.mint({value: threeEthInWei})
        console.log(`ETH balance after minting: ${web3.utils.fromWei(await web3.eth.getBalance(lender))}`)
        const underlyingBalanceEth = await cEther.balanceOfUnderlying.call(lender)
        await cEther.redeemUnderlying(underlyingBalanceEth)
        console.log(`ETH balance after redeeming underlying asset: ${web3.utils.fromWei(await web3.eth.getBalance(lender))}\n`)

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
