const ExampleDaiCoin = artifacts.require('./lever/ExampleDaiCoin.sol');
const ExampleUsdcCoin = artifacts.require('./lever/ExampleUsdcCoin.sol');
// const Funds = artifacts.require('./lever/Funds.sol');
const CErc20 = artifacts.require('./lever/CErc20.sol');
const CEther = artifacts.require('./lever/CEther.sol');
const Comptroller = artifacts.require('./lever/Comptroller.sol')
const TFCompound = artifacts.require('./lever/TFCompound.sol');

contract('TFCompound', addresses => {
  beforeEach(async function () {
    this.dai = await ExampleDaiCoin.deployed();
    this.cDai = await CErc20.deployed();

    this.usdc = await ExampleUsdcCoin.deployed();
    this.cUsdc = await CErc20.deployed();

    this.cEther = await CEther.deployed();

    this.tfCompoundDAI = await TFCompound.deployed();
    this.tfCompoundUSDC = await TFCompound.deployed();
    // console.log('this.tfCompoundDAI', this.tfCompoundDAI)
    this.comptroller = await Comptroller.deployed();
    // this.TFcompound = await Funds.deployed();
    this.tfCompoundDAI.setTokens(this.dai.address, this.cDai.address, this.cEther.address)
    this.tfCompoundUSDC.setTokens(this.usdc.address, this.cUsdc.address, this.cEther.address)
    console.log('addresses', addresses)
    console.log('tfCompoundDAI.address', this.tfCompoundDAI.address)
    console.log('tfCompoundUSDC.address', this.tfCompoundUSDC.address)
  })

  describe('TFCompound', async function() {
    it('should exist', async function() {
      assert.isOk(this.tfCompoundDAI)
      assert.isOk(this.tfCompoundUSDC)
    })
    it('should invest', async function() {
      assert.isOk(this.tfCompoundDAI.invest)
      assert.isOk(this.tfCompoundUSDC.invest)

      const address0daiBalance = await this.dai.balanceOf.call(addresses[0])
      const daiTokenBalance = await this.dai.balanceOf.call(this.dai.address)
      const cDaiTokenBalance = await this.cDai.balanceOf.call(this.cDai.address)
      const usdcTokenBalance = await this.usdc.balanceOf.call(this.usdc.address)
      const cUsdcTokenBalance = await this.cUsdc.balanceOf.call(this.cUsdc.address)
      console.log('address0daiBalance', address0daiBalance.toString())
      console.log('daiTokenBalance', daiTokenBalance.toString())
      console.log('cDaiTokenBalance', cDaiTokenBalance.toString())
      console.log('usdcTokenBalance', usdcTokenBalance.toString())
      console.log('cUsdcTokenBalance', cUsdcTokenBalance.toString())
      // const lenderTokenBalanceBefore = await this.token.balanceOf.call(addresses[0])
      // console.log('lenderTokenBalanceBefore: ', lenderTokenBalanceBefore.toString())
      // await web3.eth.sendTransaction({ to: addresses[0], from: lender, value: toWei('1', 'ether')})
      // await this.cEther.mint({ from: addresses[0], value: toWei('1', 'ether')})
      // const cErc20BalAfterDeposit2 = await this.cErc20.balanceOf.call(addresses[0])
      // console.log('cErc20BalAfterDeposit2: ', cErc20BalAfterDeposit2.toString())

      const res = await this.tfCompoundDAI.invest(1)
      console.log(res)
    })
  })
})
