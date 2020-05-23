import { get } from 'lodash'

// import ERC20JSON from '../contracts/ERC20.json'
import cErc20JSON from '../contracts/MErc20.json'
import comptrollerJSON from '../contracts/Comptroller.json'


const addresses = {
  '1': {},
  '42': {},
  'local': {
    "DaiInterestRateModel": "0x6639e685f046f7C445e59dc8891AD3CD15811FC6",
    "USDMInterestRateModel": "0x13E2D4037F800d50cdF9f827d3fB1F6711d279B0",
    "ETHInterestRateModel": "0x606d5871a12b997b53EEF3f99d542ecc26331538",
    "PriceOracle": "0x763986F184f1c2daa7e10576549EdFD231d8B47A",
    "PriceOracleProxy": "0xe94aA5dBCDdDC9C0058e5281197990Da3aFE7fd8",
    "DAI": "0xF0b863d178e711648fE362ADD304a5952A421566",
    "USDM": "0x5B817cc3eE101e1Aa24e53F3374144e3597637e2",
    "cDAI": "0x9B931C73ac1425297Db72c9bf59729aD57F1d080",
    "mETH": "0x3Ae9cEFaCa54D19eD6512b58A8Fb0263babD9E9A",
    "mUSDM": "0x96290FE92dF3DFBdB2eB24F692311e1E47327025",
    "_MakerMedianizer": "0xE35BD28E9B4a6b179FFA76B800b431513ED1bC1a",
    "TFCompoundDAI": "0x05AF4085F8529CBBA0026de1A00302B93c6eaEC8",
    "TFCompoundUSDM": "0x33A10231fB97405Ce95fc9D0BD286C2a86fFA1F0",
    "Comptroller": "0x8ea67e9B41e674D16562eFAedAc11265aF04f339",
    "Unitroller": "0xC079086aaC979D7E2CFE3077A2E706239bE62704",
  },
}

function getAddresses(networkId) {
  return get(addresses, networkId, addresses.local)
}

export const comptroller = window.web3.eth.contract(comptrollerJSON.abi).at(getAddresses(window.ethereum.networkId).Comptroller)
export const mETH = window.web3.eth.contract(cErc20JSON.abi).at(getAddresses(window.ethereum.networkId).mETH)
export const mUSDM = window.web3.eth.contract(cErc20JSON.abi).at(getAddresses(window.ethereum.networkId).mUSDM)
// const USDM = new window.web3.eth.contract(ERC20JSON.abi).at(getAddresses(window.ethereum.networkId).USDM)

console.log('comptroller ', comptroller)
console.log('mETH ', mETH)
console.log('mUSDM ', mUSDM)

/*
 * 1. Enter a market (USDM)
 * @param address? - sender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function enterMarkets(address, options = {}) {
  const addr = address || window.ethereum.selectedAddress
  if (!addr) throw new Error('Ethereum Address required.')
  try {
    return comptroller.enterMarkets([mUSDM.address, mETH.address], {
      from: addr,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * 2. Lend (ETH)
 * @param amount* - amount ETH
 * @param address? - lender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function lendETH(amount, address, options = {}) {
  const addr = address || window.ethereum.selectedAddress
  if (!addr) throw new Error('Ethereum Address required.')
  try {
    return mETH.mint(amount, {
      from: addr,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * 3. Lend (USDM)
 * @param amount* - amount USDM
 * @param address? - lender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function lendUSDM(amount, address, options = {}) {
  const addr = address || window.ethereum.selectedAddress
  if (!addr) throw new Error('Ethereum Address required.')
  try {
    return mUSDM.mint(amount, {
      from: addr,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}

/*
 * 4. Borrow (USDM)
 * @param amount* - amount USDM
 * @param address? - borrower ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function borrowUSDM(amount, address, options = {}) {
  const addr = address || window.ethereum.selectedAddress
  if (!addr) throw new Error('Ethereum Address required.')
  try {
    return mUSDM.borrow(amount, {
      from: addr,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * checkMembership
 * @param address? - borrower ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function checkMembership(address, mToken = 'mUSDM', options = {}) {
  const addr = address || window.ethereum.selectedAddress
  if (!addr) throw new Error('Ethereum Address required.')
  try {
    if (mToken.toLowerCase() === 'musdm' || mToken.toLowerCase() === 'usdm') {
      return comptroller.checkMembership(address, mUSDM, {
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      })
    }
    if (mToken.toLowerCase() === 'meth' || mToken.toLowerCase() === 'eth') {
      return comptroller.checkMembership(address, mETH, {
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      })
    }
  } catch (e) {
    console.error(e)
  }
}


/*
 * repayBorrowUSDM
 * @param amount* - amount repay
 * @param options? - gas, gasPrice, etc
**/
export async function repayBorrowUSDM(amount, options = {}) {
  try {
    return mUSDM.repayBorrow(amount, {
      from: window.ethereum.selectedAddress,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * repayBorrowETH
 * @param amount* - amount repay
 * @param options? - gas, gasPrice, etc
**/
export async function repayBorrowETH(amount, options = {}) {
  try {
    return mETH.repayBorrow({
      from: window.ethereum.selectedAddress,
      value: amount,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * redeemUnderlyingUSDM
 * @param amount* - amount underlying to redeem
 * @param options? - gas, gasPrice, etc
**/
export async function redeemUnderlyingUSDM(amount, options = {}) {
  try {
    return mUSDM.redeemUnderlying(amount, {
      from: window.ethereum.selectedAddress,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


/*
 * redeemUnderlyingETH
 * @param amount* - amount underlying to redeem
 * @param options? - gas, gasPrice, etc
**/
export async function redeemUnderlyingETH(amount, options = {}) {
  try {
    return mETH.redeemUnderlying(amount, {
      from: window.ethereum.selectedAddress,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    })
  } catch (e) {
    console.error(e)
  }
}


