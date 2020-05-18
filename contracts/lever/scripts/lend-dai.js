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

        const accounts = await web3.eth.getAccounts()
        const address = process.argv[4] || accounts[0]
        const amount = process.argv[5] || 1000

        // const mEther = await MEther.at(DeploymentInfo.Contracts.mETH)
        const mEther = await MEther.deployed()
        // const dai = await FaucetToken.at(DeploymentInfo.Contracts.DAI)
        const dai = await DAI.deployed()
        // const cDAI = await MErc20.at(DeploymentInfo.Contracts.cDAI)
        const cDAI = await MErc20.deployed()
        const comptroller = await Comptroller.at(await cDAI.comptroller())

        // Enter Markets (Executed once per deployment)
        await comptroller.enterMarkets([cDAI.address, mEther.address], { from: address })
        // Lender Lend DAI
        // await dai.allocateTo(address, daiWithDecimals(amount))
        console.log(`Lender Dai balance before lending: ${(web3.utils.fromWei(await dai.balanceOf(address)).toString())}`)
        await dai.approve(cDAI.address, daiWithDecimals(amount))
        await cDAI.mint(daiWithDecimals(amount))
        console.log(`Lender Dai balance after lending: ${web3.utils.fromWei((await dai.balanceOf(address)).toString())}\n`)

        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
