const fs = require('fs')
const { toWei, padLeft, numberToHex } = web3.utils;

// const toSecs = require('@mblackmblack/to-seconds');
// const BN = require('bignumber.js')

const DAI = artifacts.require("./DAI.sol");
const USDM = artifacts.require("./USDM.sol");
const DAIInterestRateModel = artifacts.require('./DAIInterestRateModel.sol')
const USDMInterestRateModel = artifacts.require('./USDMInterestRateModel.sol')
const ETHInterestRateModel = artifacts.require('./ETHInterestRateModel.sol')
const Unitroller = artifacts.require('./Unitroller.sol')
const Comptroller = artifacts.require('./Comptroller.sol')
const MErc20 = artifacts.require('./MErc20.sol')
const MEther = artifacts.require('./MEther.sol')
const PriceOracleProxy = artifacts.require('./PriceOracleProxy.sol')
const PriceOracle = artifacts.require('./_PriceOracle.sol')

// const Medianizer = artifacts.require('./MedianizerExample.sol');
const MakerMedianizer = artifacts.require('./_MakerMedianizer.sol')

const TFCompound = artifacts.require('./TFCompound.sol')

module.exports = function(deployer, network, accounts) {
  deployer.then(async () => {
    // Deploy Example DAI
    await deployer.deploy(DAI); // LOCAL
    // await deployer.deploy(FaucetToken, 100000000, 'USDM', uint8 _decimalUnits, string memory _tokenSymbol); // LOCAL
    const dai = await DAI.deployed(); // LOCAL
    // const dai = { address: '0xbf7a7169562078c96f0ec1a8afd6ae50f12e5a99' } // KOVAN - Compound DAI Contract
    // const dai = { address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359' } // MAINNET

    // Deploy Example USDM
    await deployer.deploy(USDM);
    const usdm = await USDM.deployed();
    // const usdm = { address: '0x6e894660985207feb7cf89faf048998c71e8ee89' } // KOVAN - Compound USDM Contract
    // const usdm = { address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' } // MAINNET

    await deployer.deploy(MakerMedianizer) // LOCAL
    const makerMedianizer = await MakerMedianizer.deployed(); // LOCAL
    await makerMedianizer.poke(padLeft(numberToHex(toWei('200', 'ether')), 64)) // LOCAL
    // const makerMedianizer = { address: '0xA944bd4b25C9F186A846fd5668941AA3d3B8425F' } // KOVAN
    // const makerMedianizer = { address: '0x729D19f657BD0614b4985Cf1D82531c67569197B' } // MAINNET

    // Deploy cDAI
    await deployer.deploy(DAIInterestRateModel, toWei('0.05', 'ether'), toWei('0.12', 'ether'))
    await deployer.deploy(USDMInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    await deployer.deploy(ETHInterestRateModel, toWei('0', 'ether'), toWei('0.2', 'ether'))
    const daiInterestRateModel = await DAIInterestRateModel.deployed()
    const usdmInterestRateModel = await USDMInterestRateModel.deployed()
    const ethInterestRateModel = await ETHInterestRateModel.deployed()

    await deployer.deploy(Unitroller)
    const unitroller = await Unitroller.deployed()

    await deployer.deploy(Comptroller)
    const comptroller = await Comptroller.deployed()

    await unitroller._setPendingImplementation(comptroller.address)
    await unitroller._acceptImplementation()
    await comptroller._setLiquidationIncentive(toWei('1.05', 'ether'))
    await comptroller._setMaxAssets(10)

    await deployer.deploy(MErc20, dai.address, comptroller.address, daiInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Dai', 'cDAI', '8')
    const cdai = await MErc20.deployed()

    const mUsdm = await MErc20.new(usdm.address, comptroller.address, usdmInterestRateModel.address, toWei('0.2', 'finney'), 'Compound Usdc', 'mUSDM', '8')

    await deployer.deploy(MEther, comptroller.address, ethInterestRateModel.address, toWei('0.2', 'gether'), 'Compound Ether', 'mETH', '8')
    const mEth = await MEther.deployed()

    await comptroller._supportMarket(cdai.address)
    await comptroller._supportMarket(mUsdm.address)
    await comptroller._supportMarket(mEth.address)

    await deployer.deploy(PriceOracle, accounts[0], dai.address, makerMedianizer.address, usdm.address, makerMedianizer.address)
    const priceOracle = await PriceOracle.deployed()

    await deployer.deploy(PriceOracleProxy, comptroller.address, priceOracle.address, mEth.address)
    const priceOracleProxy = await PriceOracleProxy.deployed()

    await priceOracle.setPrices([padLeft(numberToHex(1), 40)], [toWei('0.0049911026', 'ether')])
    await priceOracle.setPrices([padLeft(numberToHex(2), 40)], [toWei('0.0049911026', 'ether')])

    await comptroller._setPriceOracle(priceOracleProxy.address)
    await comptroller._setCollateralFactor(mEth.address, toWei('0.75', 'ether'))

    await comptroller.enterMarkets([cdai.address, mUsdm.address, mEth.address])

    await dai.approve(cdai.address, toWei('100', 'ether'))
    await cdai.mint(toWei('100', 'ether'))

    await usdm.approve(mUsdm.address, toWei('100', 'mwei'))
    await mUsdm.mint(toWei('100', 'mwei'))

    // Deploy example Medianizer
    // await deployer.deploy(Medianizer);
    // const medianizer = await Medianizer.deployed();

    const tfCompoundDAI = await deployer.deploy(TFCompound, dai.address, cdai.address, mEth.address)
    const tfCompoundUSDM = await deployer.deploy(TFCompound, usdm.address, mUsdm.address, mEth.address)

    const stats = JSON.stringify({
        DaiInterestRateModel: daiInterestRateModel.address,
        USDMInterestRateModel: usdmInterestRateModel.address,
        ETHInterestRateModel: ethInterestRateModel.address,
        PriceOracle: priceOracle.address,
        PriceOracleProxy: priceOracleProxy.address,
        DAI: dai.address,
        USDM: usdm.address,
        cDAI: cdai.address,
        mETH: mEth.address,
        mUSDM: mUsdm.address,
        _MakerMedianizer: makerMedianizer.address,
        TFCompoundDAI: tfCompoundDAI.address,
        TFCompoundUSDM: tfCompoundUSDM.address,
        Comptroller: comptroller.address,
        Unitroller: unitroller.address,
    }, null, 2)

    console.log(stats)

    fs.writeFileSync(`./addresses.${process.env.ETH_NETWORK || 'local'}.json`, stats, () => {})
  })
};
