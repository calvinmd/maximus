const fs = require('fs')
const { toWei, padLeft, numberToHex } = web3.utils;

const DAI = artifacts.require('./lever/DAI.sol');
const USDC = artifacts.require('./lever/USDC.sol');
const DAIInterestRateModel = artifacts.require('./lever/DAIInterestRateModel.sol')
const USDCInterestRateModel = artifacts.require('./lever/USDCInterestRateModel.sol')
const ETHInterestRateModel = artifacts.require('./lever/ETHInterestRateModel.sol')
const Unitroller = artifacts.require('./lever/Unitroller.sol')
const Comptroller = artifacts.require('./lever/Comptroller.sol')
const CErc20 = artifacts.require('./lever/CErc20.sol')
const CEther = artifacts.require('./lever/CEther.sol')
const PriceOracleProxy = artifacts.require('./lever/PriceOracleProxy.sol')
const PriceOracle = artifacts.require('./lever/_PriceOracle.sol')

const MakerMedianizer = artifacts.require('./lever/_MakerMedianizer.sol')

const TFCompound = artifacts.require('./lever/TFCompound.sol')

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    await deployer.deploy(DAI);
    const dai = await DAI.deployed();

    await deployer.deploy(MakerMedianizer)
    const makerMedianizer = await MakerMedianizer.deployed();
    await makerMedianizer.poke(padLeft(numberToHex(toWei('200', 'ether')), 64))

    // Deploy cDAI
    await deployer.deploy(DAIInterestRateModel, toWei('0.05', 'ether'), toWei('0.12', 'ether'))
    await deployer.deploy(ETHInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    const daiInterestRateModel = await DAIInterestRateModel.deployed()
    const ethInterestRateModel = await ETHInterestRateModel.deployed()

    await deployer.deploy(Unitroller)
    const unitroller = await Unitroller.deployed()

    await deployer.deploy(Comptroller)
    const comptroller = await Comptroller.deployed()

    await unitroller._setPendingImplementation(comptroller.address)
    await unitroller._acceptImplementation()
    await comptroller._setLiquidationIncentive(toWei('1.05', 'ether'))
    await comptroller._setMaxAssets(10)

    await deployer.deploy(CErc20, dai.address, comptroller.address, daiInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Dai', 'cDAI', '8')
    const cdai = await CErc20.deployed()

    await deployer.deploy(CEther, comptroller.address, ethInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Ether', 'cETH', '8')
    const cEth = await CEther.deployed()

    await comptroller._supportMarket(cdai.address)
    await comptroller._supportMarket(cusdc.address)
    await comptroller._supportMarket(cEth.address)

    await deployer.deploy(PriceOracle, accounts[0], dai.address, makerMedianizer.address, usdc.address, makerMedianizer.address)
    const priceOracle = await PriceOracle.deployed()

    await deployer.deploy(PriceOracleProxy, comptroller.address, priceOracle.address, cEth.address)
    const priceOracleProxy = await PriceOracleProxy.deployed()

    await priceOracle.setPrices([padLeft(numberToHex(1), 40)], [toWei('0.0049911026', 'ether')])
    await priceOracle.setPrices([padLeft(numberToHex(2), 40)], [toWei('0.0049911026', 'ether')])

    await comptroller._setPriceOracle(priceOracleProxy.address)
    await comptroller._setCollateralFactor(cEth.address, toWei('0.75', 'ether'))

    await comptroller.enterMarkets([cdai.address, cusdc.address, cEth.address])

    await dai.approve(cdai.address, toWei('100', 'ether'))
    await cdai.mint(toWei('100', 'ether'))

    await usdc.approve(cusdc.address, toWei('100', 'mwei'))
    await cusdc.mint(toWei('100', 'mwei'))

    const tfCompoundDAI = await deployer.deploy(TFCompound, dai.address, cdai.address, cEth.address)
    const tfCompoundUSDC = await deployer.deploy(TFCompound, usdc.address, cusdc.address, cEth.address)

    const stats = JSON.stringify({
        DaiInterestRateModel: daiInterestRateModel.address,
        USDCInterestRateModel: usdcInterestRateModel.address,
        ETHInterestRateModel: ethInterestRateModel.address,
        PriceOracle: priceOracle.address,
        PriceOracleProxy: priceOracleProxy.address,
        DAI: dai.address,
        cDAI: cdai.address,
        cETH: cEth.address,
        _MakerMedianizer: makerMedianizer.address,
        TFCompoundDAI: tfCompoundDAI.address,
        TFCompoundUSDC: tfCompoundUSDC.address,
        Comptroller: comptroller.address,
        Unitroller: unitroller.address,
    }, null, 2)

    console.log(stats)

    fs.writeFileSync(`./addresses.${process.env.ETH_NETWORK || 'local'}.json`, stats, () => {})
  })
};
