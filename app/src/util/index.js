import { get } from 'lodash'


const addresses = {
  '1': {},
  '42': {},
  'local': {
    "DaiInterestRateModel": "0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7",
    "USDMInterestRateModel": "0xe982E462b094850F12AF94d21D470e21bE9D0E9C",
    "PriceOracle": "0xFC628dd79137395F3C9744e33b1c5DE554D94882",
    "PriceOracleProxy": "0x5f8e26fAcC23FA4cbd87b8d9Dbbd33D5047abDE1",
    "DAI": "0xCfEB869F69431e42cdB54A4F4f105C19C080A601",
    "USDM": "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B",
    "mUSDM": "0xDb56f2e9369E0D7bD191099125a3f6C370F8ed15",
    "_MakerMedianizer": "0xC89Ce4735882C9F0f0FE26686c53074E09B0D550",
    "TFCompoundDAI": "0x2D8BE6BF0baA74e0A907016679CaE9190e80dD0A",
    "TFCompoundUSDM": "0x970e8f18ebfEa0B08810f33a5A40438b9530FBCF",
    "Comptroller": "0x9b1f7F645351AF3631a656421eD2e40f2802E6c0",
    "Unitroller": "0x0290FB167208Af455bB137780163b7B7a9a10C16"
  },
}

function getAddresses(networkId) {
  return get(addresses, networkId, addresses.local)
}

const ERC20JSON = require('../contracts/ERC20.json')
const cErc20JSON = require('../contracts/CErc20.json')
const comptrollerJSON = require('../contracts/Comptroller.json')

const comptroller = new web3.eth.contract(comptrollerJSON.abi).at(addresses.Comptroller)
const mUSDM = new web3.eth.contract(cErc20JSON.abi).at(addresses.mUSDM)
const USDM = new web3.eth.contract(ERC20JSON.abi).at(addresses.USDM)


/*
 * 1. Enter a market (USDM)
 * @param address? - sender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async enterMarketUSDM(address, options = {}) {
  const addr = get(address, web3.ethereum.selectedAddress)
  if (!addr) throw new Error('Ethereum Address required.')
  return comptroller.methods.enterMarkets(['USDM']).send({
    from: addr,
    gas: 2500000,
    nonce: await web3.eth.getTransactionCount(address),
    ...options,
  })
}


/*
 * 2. Lend (USDM)
 * @param amount* - amount USDM
 * @param address? - lender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async lendUSDM(amount, address, options = {}) {
  const addr = get(address, web3.ethereum.selectedAddress)
  if (!addr) throw new Error('Ethereum Address required.')
  return mUSDM.methods.mint(amount).send({
    from: addr,
    gas: 2500000,
    nonce: await web3.eth.getTransactionCount(address),
    ...options,
  })
}

/*
 * 3. Borrow (USDM)
 * @param amount* - amount USDM
 * @param address? - borrower ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async borrowUSDM(amount, address, options = {}) {
  const addr = get(address, web3.ethereum.selectedAddress)
  if (!addr) throw new Error('Ethereum Address required.')
  return mUSDM.methods.borrow(amount).send({
    from: addr,
    gas: 2500000,
    nonce: await this.web3.eth.getTransactionCount(address),
    ...options,
  })
}

