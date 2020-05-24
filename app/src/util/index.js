import { get } from 'lodash'

import ERC20JSON from '../contracts/ERC20.json'
import USDMJSON from '../contracts/USDM.json'
import cErc20JSON from '../contracts/MErc20.json'
import comptrollerJSON from '../contracts/Comptroller.json'

import localAddresses from '../addresses.local.json'

const addresses = {
  '1': {},
  '42': {},
  'local': localAddresses,
}

function getAddresses(networkId) {
  return get(addresses, networkId, addresses.local)
}

export const comptroller = window.web3.eth.contract(comptrollerJSON.abi).at(getAddresses(window.ethereum.networkId).Comptroller)
export const mETH = window.web3.eth.contract(cErc20JSON.abi).at(getAddresses(window.ethereum.networkId).mETH)
export const mUSDM = window.web3.eth.contract(cErc20JSON.abi).at(getAddresses(window.ethereum.networkId).mUSDM)
export const USDM = window.web3.eth.contract(USDMJSON.abi).at(getAddresses(window.ethereum.networkId).USDM)

console.log('comptroller ', comptroller)
console.log('mETH ', mETH)
console.log('mUSDM ', mUSDM)
console.log('USDM ', USDM)


/*
 * 0.a. approvemUSDM
 * @param address? - sender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function _approve_mUSDM(amount, address, options = {}) {
  return new Promise((resolve, reject) => {
    const addr = address || window.ethereum.selectedAddress
    if (!addr) throw new Error('Ethereum Address required.')
    try {
      console.log('addr', addr, 'amount', amount)
      return USDM.approve(addr, amount, {
        // value: amount,
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      }, () => {
        console.log('Done.')
        return resolve()
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
_approve_mUSDM.exampleParams = [100]
_approve_mUSDM.description = 'Authorize the amount of mTokens to mint.'


/*
 * 0.a. approvemETH
 * @param address? - sender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function _approve_mETH(amount, address, options = {}) {
  return new Promise((resolve, reject) => {
    const addr = address || window.ethereum.selectedAddress
    if (!addr) throw new Error('Ethereum Address required.')
    try {
      return mETH.approve(addr, amount, {
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      }, () => {
        console.log('Done.')
        return resolve()
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
_approve_mETH.exampleParams = [100]
_approve_mETH.description = 'Authorize the amount of mTokens to mint.'


/*
 * 1. Enter a market (USDM)
 * @param address? - sender ethereum address
 * @param options? - gas, gasPrice, etc
**/
export async function enterMarkets(address, options = {}) {
  return new Promise((resolve, reject) => {
    const addr = address || window.ethereum.selectedAddress
    if (!addr) throw new Error('Ethereum Address required.')
    try {
      return comptroller.enterMarkets([mUSDM.address, mETH.address], {
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      }, () => {
        console.log('Done.')
        return resolve()
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
enterMarkets.exampleParams = []
enterMarkets.description = 'Authorize the money market application.'


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
      // value: amount,
      from: addr,
      gas: 2500000,
      // nonce: await window.web3.eth.getTransactionCount(addr),
      ...options,
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
lendETH.exampleParams = [window.web3.toWei(100)]
lendETH.description = 'Lend Eth for interest, and/or lock for collateral to borrow USDM later.'


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
    return _approve_mUSDM(amount, addr).then(r => {
      mUSDM.mint(amount, {
        from: addr,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      }, () => {
        console.log('Done.')
      })
    })
  } catch (e) {
    console.error(e)
  }
}
lendUSDM.exampleParams = [100]
lendUSDM.description = 'Lend USDM for interest, and/or lock for collateral to borrow USDM later.'

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
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
borrowUSDM.exampleParams = [100]
borrowUSDM.description = 'Borrow USDM against your collateral.'

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
checkMembership.exampleParams = []
checkMembership.description = 'Check if you\'ve allowed access to the money market contract.'


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
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
repayBorrowUSDM.exampleParams = [1]
repayBorrowUSDM.description = 'Repay borrow of USDM.'


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
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
repayBorrowETH.exampleParams = [1]
repayBorrowETH.description = 'Repay borrow of ETH.'


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
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
redeemUnderlyingUSDM.exampleParams = [1]
redeemUnderlyingUSDM.description = 'Redeem underlying USDM.'


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
    }, () => {
      console.log('Done.')
    })
  } catch (e) {
    console.error(e)
  }
}
redeemUnderlyingETH.exampleParams = [1]
redeemUnderlyingETH.description = 'Redeem underlying ETH.'


/*
 * totalBorrowsCurrentUSDM
**/
export async function totalBorrowsCurrentUSDM(options = {}) {
  try {
    return mUSDM.totalBorrowsCurrent({
      from: window.ethereum.selectedAddress,
        gas: 2500000,
        // nonce: await window.web3.eth.getTransactionCount(addr),
        ...options,
      },
      (a, b, c) => {
      console.log('Done.', a, b, c)
    })
  } catch (e) {
    console.error(e)
  }
}
totalBorrowsCurrentUSDM.exampleParams = []
totalBorrowsCurrentUSDM.description = 'Sign. Get total borrows current of USDM.'


/*
 * totalBorrowsUSDM
**/
export async function totalBorrowsUSDM(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      mUSDM.totalBorrows((err, res) => {
        if (err) throw new Error(err)
        console.log('Done.', Number(res))
        return resolve(Number(res))
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
totalBorrowsUSDM.exampleParams = []
totalBorrowsUSDM.description = 'No Sign. Get total borrows of USDM.'


/*
 * totalSupplyUSDM
**/
export async function totalSupplyUSDM(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      mUSDM.totalSupply((err, res) => {
        if (err) throw new Error(err)
        console.log('Done.', Number(res))
        return resolve(Number(res))
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
totalSupplyUSDM.exampleParams = []
totalSupplyUSDM.description = 'No Sign. Get total supply of USDM.'


/*
 * borrowRatePerBlockUSDM
**/
export async function borrowRatePerBlockUSDM(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      mUSDM.borrowRatePerBlock((err, res) => {
        if (err) throw new Error(err)
        console.log('Done.', Number(res))
        return resolve(Number(res) / 1e18)
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
borrowRatePerBlockUSDM.exampleParams = []
borrowRatePerBlockUSDM.description = 'Borrow Rate Per Block USDM.'


/*
 * supplyRatePerBlockUSDM
**/
export async function supplyRatePerBlockUSDM(options = {}) {
  return new Promise((resolve, reject) => {
    try {
      mUSDM.supplyRatePerBlock((err, res) => {
        if (err) throw new Error(err)
        console.log('Done.', Number(res))
        return resolve(Number(res) / 1e18)
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
supplyRatePerBlockUSDM.exampleParams = []
supplyRatePerBlockUSDM.description = 'Supply Rate Per Block USDM.'


/*
 * faucetMintUSDM
**/
export async function faucetMintUSDM(amount, address, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const addr = address || window.ethereum.selectedAddress
      if (!addr) throw new Error('Ethereum Address required.')
      USDM.allocateTo(addr, amount, (err, res) => {
        if (err) throw new Error(err)
        console.log('Done.', res)
        return resolve(res)
      })
    } catch (e) {
      console.error(e)
      return reject(e)
    }
  })
}
faucetMintUSDM.exampleParams = [1000]
faucetMintUSDM.description = 'Supply Rate Per Block USDM.'
