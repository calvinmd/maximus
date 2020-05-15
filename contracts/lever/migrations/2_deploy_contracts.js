const fs = require('fs')
const { toWei, padLeft, numberToHex } = web3.utils;

// const toSecs = require('@mblackmblack/to-seconds');
// const BN = require('bignumber.js')

const DAI = artifacts.require("./DAI.sol");
const USDC = artifacts.require("./USDC.sol");
const DAIInterestRateModel = artifacts.require('./DAIInterestRateModel.sol')
const USDCInterestRateModel = artifacts.require('./USDCInterestRateModel.sol')
const ETHInterestRateModel = artifacts.require('./ETHInterestRateModel.sol')
const Unitroller = artifacts.require('./Unitroller.sol')
const Comptroller = artifacts.require('./Comptroller.sol')
const CErc20 = artifacts.require('./CErc20.sol')
const CEther = artifacts.require('./CEther.sol')
const PriceOracleProxy = artifacts.require('./PriceOracleProxy.sol')
const PriceOracle = artifacts.require('./_PriceOracle.sol')

// const Medianizer = artifacts.require('./MedianizerExample.sol');
const MakerMedianizer = artifacts.require('./_MakerMedianizer.sol')

const TFCompound = artifacts.require('./TFCompound.sol')

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    // Deploy Example DAI
    await deployer.deploy(DAI); // LOCAL
    // await deployer.deploy(FaucetToken, 100000000, 'USDC', uint8 _decimalUnits, string memory _tokenSymbol); // LOCAL
    const dai = await DAI.deployed(); // LOCAL
    // const dai = { address: '0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99' } // KOVAN - Compound DAI Contract
    // const dai = { address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359' } // MAINNET

    // Deploy Example USDC
    await deployer.deploy(USDC);
    const usdc = await USDC.deployed();
    // const usdc = { address: '0x6e894660985207feb7cf89faf048998c71e8ee89' } // KOVAN - Compound USDC Contract
    // const usdc = { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' } // MAINNET

    await deployer.deploy(MakerMedianizer) // LOCAL
    const makerMedianizer = await MakerMedianizer.deployed(); // LOCAL
    await makerMedianizer.poke(padLeft(numberToHex(toWei('200', 'ether')), 64)) // LOCAL
    // const makerMedianizer = { address: '0xA944bd4b25C9F186A846fd5668941AA3d3B8425F' } // KOVAN
    // const makerMedianizer = { address: '0x729D19f657BD0614b4985Cf1D82531c67569197B' } // MAINNET

    // Deploy cDAI
    await deployer.deploy(DAIInterestRateModel, toWei('0.05', 'ether'), toWei('0.12', 'ether'))
    await deployer.deploy(USDCInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    await deployer.deploy(ETHInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    const daiInterestRateModel = await DAIInterestRateModel.deployed()
    const usdcInterestRateModel = await USDCInterestRateModel.deployed()
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

    const cusdc = await CErc20.new(usdc.address, comptroller.address, usdcInterestRateModel.address, toWei('0.2', 'finney'), 'Compound Usdc', 'cUSDC', '8')

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

    // Deploy example Medianizer
    // await deployer.deploy(Medianizer);
    // const medianizer = await Medianizer.deployed();

    const tfCompoundDAI = await deployer.deploy(TFCompound, dai.address, cdai.address, cEth.address)
    const tfCompoundUSDC = await deployer.deploy(TFCompound, usdc.address, cusdc.address, cEth.address)

    const stats = JSON.stringify({
        DaiInterestRateModel: daiInterestRateModel.address,
        USDCInterestRateModel: usdcInterestRateModel.address,
        ETHInterestRateModel: ethInterestRateModel.address,
        PriceOracle: priceOracle.address,
        PriceOracleProxy: priceOracleProxy.address,
        DAI: dai.address,
        USDC: usdc.address,
        cDAI: cdai.address,
        cETH: cEth.address,
        cUSDC: cusdc.address,
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
