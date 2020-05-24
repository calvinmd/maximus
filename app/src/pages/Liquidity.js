import React, { useState } from 'react';

import * as util from '../util'

import { Button } from '../components/Button';
import { Statistic } from '../components/Statistic';

const getTabButtonClassNames = (active) => {
  if (active) {
    return 'inline-block text-sm px-16 py-4 border-mred bg-mred leading-none border-2 text-white hover:bg-mred mt-4 lg:mt-0 font-bold';
  }

  return 'inline-block text-sm px-16 py-4 border-mred leading-none border-2 text-mred hover:text-white hover:bg-mred mt-4 lg:mt-0 font-bold';
};

const getClassNames = (active) => {
  if (active) {
    return 'inline-block text-sm px-16 py-4 border-mred bg-mred leading-none border rounded text-white hover:bg-mred mt-4 lg:mt-0';
  }

  return 'inline-block text-sm px-16 py-4 border-mred leading-none border text-mred rounded hover:text-white hover:bg-mred mt-4 lg:mt-0';
};

const Liquidity = () => {
  const [action, setAction] = useState('borrow'); // values are 'borrow', 'repay', 'supply', 'withdraw'
  const [borrowInputAmount, setBorrowInputAmount] = useState(''); //
  // const [repayInputAmount, setRepayInputAmount] = useState('');
  const [supplyInputAmount, setSupplyInputAmount] = useState('');
  // const [withdrawInputAmount, setWithdrawInputAmount] = useState('');
  const [ethInputAmount, setETHInputAmount] = useState('');

  const [walletUSDMBalance, setWalletUSDMBalance] = useState(0); // amount of USD in wallet
  const [walletETHBalance, setWalletETHBalance] = useState(0); // amount of ETH in wallet
  const [borrowBalance, setBorrowBalance] = useState(0); // amount borrowing from market
  const [borrowLimit, setBorrowLimit] = useState(0); // value of collateralized assets
  const [supplyBalance, setSupplyBalance] = useState(0); // amount supplying to market
  const [ethBalance, setETHBalance] = useState(0); // amount of eth collateralized

  const [totalBorrowsUSDM, setTotalBorrowsUSDM] = useState('...');
  const [totalSupplyUSDM, setTotalSupplyUSDM] = useState('...');
  const [borrowRatePerBlockUSDM, setBorrowRatePerBlockUSDM] = useState('...');
  const [supplyRatePerBlockUSDM, setSupplyRatePerBlockUSDM] = useState('...');

  React.useEffect(() => {
    util.totalBorrowsUSDM().then(r => setTotalBorrowsUSDM(r))
    util.totalSupplyUSDM().then(r => setTotalSupplyUSDM(r))
    util.borrowRatePerBlockUSDM().then(r => setBorrowRatePerBlockUSDM(r))
    util.supplyRatePerBlockUSDM().then(r => setSupplyRatePerBlockUSDM(r))
  }, [])

  const handleClickAction = (action) => {
    setAction(action);
  };

  const handleClickMax = () => {
    if (action === "borrow") {
      setBorrowInputAmount(String(borrowLimit));
    } else if (action === "repay") {
      setBorrowInputAmount(String(borrowBalance));
    } else if (action === "supply") {
      setSupplyInputAmount(String(walletUSDMBalance));
    } else if (action === "withdraw") {
       setSupplyInputAmount(String(supplyBalance));
    } else if (action === "collateralize_eth") {
      setETHInputAmount(walletETHBalance);
    } else if (action === "withdraw_eth") {
      setETHInputAmount(ethBalance);
    }
  };

  const handleChangeBorrowAmount = (event) => {
    setBorrowInputAmount(event.target.value);
  };

  const handleChangeSupplyAmount = (event) => {
    setSupplyInputAmount(event.target.value);
  };

  const handleChangeETHAmount = (event) => {
    setETHInputAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: compile transaction information
    // TODO: send transaction to network
  };

  const isSubmitDisabled = () => {
    if (action === 'borrow') {
      const amount = Number(borrowInputAmount);
      return borrowLimit === 0 || amount > borrowLimit;
    }

    if (action === 'repay') {
      const amount = Number(borrowInputAmount);
      return borrowBalance === 0 || amount > borrowBalance;
    }

    if (action === 'supply') {
      const amount = Number(supplyInputAmount);
      return walletUSDMBalance === 0 || amount > walletUSDMBalance;
    }

    if (action === 'withdraw') {
      const amount = Number(supplyInputAmount);
      return supplyBalance === 0 || amount > supplyBalance;
    }

    return false;
  };

  const isBorrow = ['borrow', 'repay'].includes(action);
  const isSupply = ['supply', 'withdraw'].includes(action);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-italic">Money Market</h1>
      <div className="flex flex-col sm:flex-row justify-center space-x-4">
        <div className="rounded-lg border-2 border-black p-8">
          <h2 className="text-2xl border-b-8 border-mred mb-2">Borrow</h2>
          <Statistic label="APY" value={`${borrowRatePerBlockUSDM}%`} />
          <Statistic label="Total Borrowed" value={`${totalBorrowsUSDM} USDM`} />
          <Statistic label="24h Volume" value={`52,342 USDM`} />
        </div>
        <div className="rounded-lg border-2 border-black p-8">
          <h2 className="text-2xl border-b-8 border-mred mb-2">Supply</h2>
          <Statistic label="APY" value={`${supplyRatePerBlockUSDM}%`} />
          <Statistic label="Total Supplied" value={`${totalSupplyUSDM} USDM`} />
          <Statistic label="24h Volume" value={`52,342 USDM`} />
        </div>
      </div>
      <div className="text-center my-8 text-center">
        <Button label="BORROW" onClick={() => handleClickAction("borrow")} className={getTabButtonClassNames(action === 'borrow')} />
        <Button label="REPAY" onClick={() => handleClickAction("repay")} className={getTabButtonClassNames(action === 'repay')} />
        <Button label="SUPPLY" onClick={() => handleClickAction("supply")} className={getTabButtonClassNames(action === 'supply')} />
        <Button label="WITHDRAW" onClick={() => handleClickAction("withdraw")} className={getTabButtonClassNames(action === 'withdraw')} />
        <Button label="COLLATERALIZE ETH" onClick={() => handleClickAction("collateralize_eth")} className={getTabButtonClassNames(action === 'collateralize_eth')} />
        <Button label="WITHDRAW ETH" onClick={() => handleClickAction("withdraw_eth")} className={getTabButtonClassNames(action === 'withdraw_eth')} />
        <Button label="ADD UNISWAPv2 USDM/ETH (Rinkeby)" onClick={() => window.open("https://uniswap.exchange/add/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0xc778417E063141139Fce010982780140Aa0cD5Ab")} className={getTabButtonClassNames(action === 'uniswap')} />
        <Button label="REMOVE UNISWAPv2 USDM/ETH (Rinkeby)" onClick={() => window.open("https://uniswap.exchange/remove/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0xc778417E063141139Fce010982780140Aa0cD5Ab")} className={getTabButtonClassNames(action === 'uniswap')} />
        <Button label="ADD UNISWAPv2 USDM/MXS (Rinkeby)" onClick={() => window.open("https://uniswap.exchange/add/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0x94082fe34E939EDd3FDE466Ea4a58cD5bFCF3048")} className={getTabButtonClassNames(action === 'uniswap')} />
        <Button label="REMOVE UNISWAPv2 USDM/MXS (Rinkeby)" onClick={() => window.open("https://uniswap.exchange/remove/0x3d2aB6aa7BAaef25a39D1B3b1ce22418f3ef0223-0x94082fe34E939EDd3FDE466Ea4a58cD5bFCF3048")} className={getTabButtonClassNames(action === 'uniswap')} />
      </div>
      <div>
        {/* <div className={`space-x-2 text-center ${side === 'borrow' ? '' : 'hidden'}`}>
          <Button label="Borrow" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'borrow')} />
          <Button label="Repay" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'repay')} />
        </div>
        <div className={`space-x-2 text-center ${side === 'supply' ? '' : 'hidden'}`}>
          <Button label="Supply" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'supply')} />
          <Button label="Withdraw" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'withdraw')} />
        </div> */}
        <div className="flex flex-row justify-center space-x-12">
          <div className="justify-center">
            {/* BORROW */}
            <div className={isBorrow ? '' : 'hidden'}>
              <Statistic label="Borrow Limit" value={`${borrowLimit} USDM`} />
              <Statistic label="Borrow Balance" value={`${borrowBalance} USDM`} />
            </div>
            {/* SUPPLY */}
            <div className={isSupply ? '' : 'hidden'}>
              <Statistic label="Wallet" value={`${walletUSDMBalance} USDM`} />
              <Statistic label="Supply Balance" value={`${supplyBalance} USDM`} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* BORROW */}
            <div className={`border-b-2 border-black ${isBorrow ? '' : 'hidden'}`}>
              <input type="text" className="text-5xl" placeholder="0" value={borrowInputAmount} onChange={handleChangeBorrowAmount} />
              <Button label="max" onClick={handleClickMax} className="border border-mred rounded p-1 text-sm text-mred hover:text-mred"/>
            </div>

            {/* SUPPLY */}
            <div className={`border-b-2 border-black ${isSupply ? '' : 'hidden'}`}>
              <input type="text" className="text-5xl" placeholder="0" value={supplyInputAmount} onChange={handleChangeSupplyAmount} />
              <Button label="max" onClick={handleClickMax} className="border border-mred rounded p-1 text-sm text-mred hover:text-mred"/>
            </div>

            {/* ETH */}
            <div className={`border-b-2 border-black ${isSupply ? '' : 'hidden'}`}>
              <input type="text" className="text-5xl" placeholder="0" value={ethInputAmount} onChange={handleChangeETHAmount} />
              <Button label="max" onClick={handleClickMax} className="border border-mred rounded p-1 text-sm text-mred hover:text-mred"/>
            </div>

            <Button
              label="Execute"
              disabled={isSubmitDisabled()}
              type="submit"
              className={`inline-block text-xs px-4 py-2 leading-none border rounded text-white mt-4 lg:mt-0 ${isSubmitDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-mred"}`}
              onClick={() => {
                switch(action) {
                  case 'borrow':
                    return util.borrowUSDM(borrowInputAmount);
                  case 'repay':
                    return util.repayBorrowUSDM(borrowInputAmount);
                  case 'supply':
                    return util.lendUSDM(supplyInputAmount);
                  case 'withdraw':
                    return util.redeemUnderlyingUSDM(supplyInputAmount);
                  case 'collateralize_eth':
                    return util.lendETH(ethInputAmount);
                  case 'withdraw_eth':
                    return util.redeemUnderlyingETH(ethInputAmount);
                  default: return
                }
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export { Liquidity };
