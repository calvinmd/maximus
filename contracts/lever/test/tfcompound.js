const ExampleDaiCoin = artifacts.require('./lever/ExampleDaiCoin.sol');
const MErc20 = artifacts.require('./lever/MErc20.sol');
const MEther = artifacts.require('./lever/MEther.sol');
const Comptroller = artifacts.require('./lever/Comptroller.sol')
const TFCompound = artifacts.require('./lever/TFCompound.sol');

contract('TFCompound', addresses => {
  beforeEach(async function () {
    this.dai = await ExampleDaiCoin.deployed();
    this.cDai = await MErc20.deployed();
    this.mEther = await MEther.deployed();

    this.tfCompoundDAI = await TFCompound.deployed();
    this.comptroller = await Comptroller.deployed();
    this.tfCompoundDAI.setTokens(this.dai.address, this.cDai.address, this.mEther.address)
    console.log('addresses', addresses)
    console.log('tfCompoundDAI.address', this.tfCompoundDAI.address)
    console.log('tfCompoundUSDM.address', this.tfCompoundUSDM.address)
  })

  describe('TFCompound', async function() {
    it('should exist', async function() {
      assert.isOk(this.tfCompoundDAI)
      assert.isOk(this.tfCompoundUSDM)
    })
    it('should invest', async function() {
      assert.isOk(this.tfCompoundDAI.invest)
      assert.isOk(this.tfCompoundUSDM.invest)

      const address0daiBalance = await this.dai.balanceOf.call(addresses[0])
      const daiTokenBalance = await this.dai.balanceOf.call(this.dai.address)
      const cDaiTokenBalance = await this.cDai.balanceOf.call(this.cDai.address)
      const mUsdmTokenBalance = await this.mUsdm.balanceOf.call(this.mUsdm.address)
      console.log('address0daiBalance', address0daiBalance.toString())
      console.log('daiTokenBalance', daiTokenBalance.toString())
      console.log('cDaiTokenBalance', cDaiTokenBalance.toString())
      console.log('mUsdmTokenBalance', mUsdmTokenBalance.toString())
      // const lenderTokenBalanceBefore = await this.token.balanceOf.call(addresses[0])
      // console.log('lenderTokenBalanceBefore: ', lenderTokenBalanceBefore.toString())
      // await web3.eth.sendTransaction({ to: addresses[0], from: lender, value: toWei('1', 'ether')})
      // await this.mEther.mint({ from: addresses[0], value: toWei('1', 'ether')})
      // const cErc20BalAfterDeposit2 = await this.cErc20.balanceOf.call(addresses[0])
      // console.log('cErc20BalAfterDeposit2: ', cErc20BalAfterDeposit2.toString())

      const res = await this.tfCompoundDAI.invest(1)
      console.log(res)
    })
  })
})
