# Maximus

HackMoney 2020 Hackathon Project: Maximus by team Titans

## Local Dev Env Setup

- Created with the drizzle-box starter kit: https://github.com/truffle-box/drizzle-box
- Install Truffle globally if you haven't yet: `npm i -g truffle`
- Run the development console: `truffle develop` and type in the console: `compile` then `migrate`
- Start the app: `cd app` then `npm run start`
- To run test on smart contracts, type `truffle test` from shell, `npm run test` for app
- To build the application: `npm run build`

## Helpful Docs

- Check out our [documentation](http://truffleframework.com/docs/drizzle/getting-started) or any of the three repositories ([drizzle](https://github.com/trufflesuite/drizzle), [drizzle-react](https://github.com/trufflesuite/drizzle-react), [drizzle-react-components](https://github.com/trufflesuite/drizzle-react-components)).


## Deployment

get ether on deploy address
import solidity pk into ethereum node
ETH_NETWORK=rinkeby RINKEBY_PROVIDER=https://MY.RINKEBY.NODE truffle migrate --network rinkeby

### Contract addresses on Rinkeby

Maximus Token (MXS)
0x94082fe34e939edd3fde466ea4a58cd5bfcf3048
https://rinkeby.etherscan.io/address/0x94082fe34e939edd3fde466ea4a58cd5bfcf3048

USDM (USDM)
0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223
https://rinkeby.etherscan.io/address/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223

ADD UNISWAPv2 USDM/ETH (Rinkeby)
https://uniswap.exchange/add/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0xc778417E063141139Fce010982780140Aa0cD5Ab

REMOVE UNISWAPv2 USDM/ETH (Rinkeby)
https://uniswap.exchange/remove/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0xc778417E063141139Fce010982780140Aa0cD5Ab

ADD UNISWAPv2 USDM/MXS (Rinkeby)
https://uniswap.exchange/add/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0x94082fe34E939EDd3FDE466Ea4a58cD5bFCF3048

REMOVE UNISWAPv2 USDM/MXS (Rinkeby)
https://uniswap.exchange/remove/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0x94082fe34E939EDd3FDE466Ea4a58cD5bFCF3048

```
{
  "DaiInterestRateModel": "0x266F3cA6b3Faa53C36f3E827B63D0293EA0F3D2d",
  "USDMInterestRateModel": "0x9A54b21E52215958e81D2C9b160eBc102201E163",
  "ETHInterestRateModel": "0x7aaee5B6943C8742A049cEed0ac655dB56c03E3f",
  "PriceOracle": "0x9C3e749d58EDBDC7c09b1aAbDE86c269b5B837CC",
  "PriceOracleProxy": "0x9cf353c14E7Eec6AbAaeAaEC394CD7576c844Bd9",
  "DAI": "0x86973D37A14c3454C9cCf7127A7dd7942EEF6B40",
  "USDM": "0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223",
  "cDAI": "0xd14225CFf3D49097583b85461c058266b69C878f",
  "mETH": "0xCF3E8d9E15f1C7C360b1CbC39794e57363300050",
  "mUSDM": "0xa34d0e24D6bdCB3B90dac77c9f037b185F76C5a5",
  "_MakerMedianizer": "0xFC01DE18E5F20E80F9bc43DBb1E5d3cF46796302",
  "TFCompoundDAI": "0x73d6ee1b1C777234f24af15cFaEeAaF2E02C3627",
  "TFCompoundUSDM": "0x2D6484c944F7Bc2a69E202E733a8E98418c31365",
  "Comptroller": "0xA24364F6c8506a6Eb9Af64eb1c501e761FF03BE7",
  "Unitroller": "0x0a889Aa39854787D6b58C0F34145E7A73C4c91f6"
}
```
