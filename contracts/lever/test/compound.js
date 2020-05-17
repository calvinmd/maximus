const { time, expectRevert, balance } = require('openzeppelin-test-helpers');

const _ = require('lodash')

const toSecs        = require('@mblackmblack/to-seconds');
const { sha256 }    = require('@liquality/crypto')
const { ensure0x }  = require('@liquality/ethereum-utils');
const { BigNumber: BN } = require('bignumber.js');
const axios         = require('axios');

const ExampleCoin = artifacts.require('./lever/ExampleDaiCoin.sol');
const Med = artifacts.require('./lever/MedianizerExample.sol');

const CErc20 = artifacts.require('./lever/CErc20.sol');
const CEther = artifacts.require('./lever/CEther.sol');
const Comptroller = artifacts.require('./lever/Comptroller.sol')
const PriceOracleProxy = artifacts.require('./lever/PriceOracleProxy.sol')
const PriceOracle = artifacts.require('./lever/_PriceOracle.sol')

const utils = require('./helpers/Utils.js');

const { rateToSec, numToBytes32, toBaseUnit } = utils;
const { toWei, fromWei } = web3.utils;

const addresses = ['0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1']

const BTC_TO_SAT = 10**8

const COM = 10 ** 8
const SAT = 10 ** 8
const COL = 10 ** 8
const WAD = 10 ** 18
const RAY = 10 ** 27

BN.config({ ROUNDING_MODE: BN.ROUND_DOWN })

const stablecoins = [ { name: 'DAI', unit: 'ether' } ]

async function getContracts(stablecoin, accounts) {
  if (stablecoin == 'DAI') {
    const token = await ExampleCoin.deployed();
    const med   = await Med.deployed();
    const cErc20 = await CErc20.deployed();
    const cEther = await CEther.deployed();
    const comptroller = await Comptroller.deployed();

    return { token, med, cErc20, cEther, comptroller }
  }
}

stablecoins.forEach((stablecoin) => {
  const { name, unit } = stablecoin

  contract(`${name} Compound`, accounts => {
    const lender = accounts[0]
    const borrower = accounts[1]
    const arbiter = accounts[2]
    const lender2 = accounts[3]

    let currentTime
    let btcPrice

    let col;

    let lendSecs = []
    let lendSechs = []
    for (let i = 0; i < 4; i++) {
      let sec = sha256(Math.random().toString())
      lendSecs.push(ensure0x(sec))
      lendSechs.push(ensure0x(sha256(sec)))
    }

    const borpubk = '02b4c50d2b6bdc9f45b9d705eeca37e811dfdeb7365bf42f82222f7a4a89868703'
    const lendpubk = '03dc23d80e1cf6feadf464406e299ac7fec9ea13c51dfd9abd970758bf33d89bb6'
    const arbiterpubk = '02688ce4b6ca876d3e0451e6059c34df4325745c1f7299ebc108812032106eaa32'

    let borSecs = []
    let borSechs = []
    for (let i = 0; i < 4; i++) {
      let sec = sha256(Math.random().toString())
      borSecs.push(ensure0x(sec))
      borSechs.push(ensure0x(sha256(sec)))
    }

    let arbiterSecs = []
    let arbiterSechs = []
    for (let i = 0; i < 4; i++) {
      let sec = sha256(Math.random().toString())
      arbiterSecs.push(ensure0x(sec))
      arbiterSechs.push(ensure0x(sha256(sec)))
    }

    beforeEach(async function () {
      currentTime = await time.latest();

      btcPrice = '9340.23'

      const { token, med, cErc20, cEther, comptroller } = await getContracts(name, accounts)

      this.token = token
      this.med = med
      this.cErc20 = cErc20
      this.cEther = cEther
      this.comptroller = comptroller
    })

    describe('deposit', function() {
      it('should update cBalance based on compound exchange rate of cTokens', async function() {
        const tfcAddr = '0x1edE38E0d7Ae7E3fa590B55e78ccB5E3ECA14458'
        const cErc20TokenBalanceBefore = await this.token.balanceOf.call(this.cErc20.address)
        console.log('cErc20TokenBalanceBefore: ', cErc20TokenBalanceBefore.toString())
        const lenderTokenBalanceBefore = await this.token.balanceOf.call(addresses[0])
        console.log('lenderTokenBalanceBefore: ', lenderTokenBalanceBefore.toString())
        await web3.eth.sendTransaction({ to: addresses[0], from: lender, value: toWei('1', 'ether')})
        await this.cEther.mint({ from: addresses[0], value: toWei('1', 'ether')})
        const cErc20BalAfterDeposit2 = await this.cErc20.balanceOf.call(addresses[0])
        console.log('cErc20BalAfterDeposit2: ', cErc20BalAfterDeposit2.toString())
      })
    })

    describe('withdraw', function() {
      it('should update cBalance based on compound exchange rate of cTokens', async function() {
        await web3.eth.sendTransaction({ to: addresses[0], from: lender, value: toWei('1', 'ether')})
        await this.cEther.mint({ from: addresses[0], value: toWei('1', 'ether')})
      })
    })
  })
})
