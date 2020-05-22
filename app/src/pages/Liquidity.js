import React, { useState } from 'react';

import { Button } from '../components/Button';
import { Statistic } from '../components/Statistic';

const getUserIntent = (side, borrowAction, supplyAction) => {
  if (side === 'borrow') {
    if (borrowAction === 'borrow') {
      return 'borrow';
    }

    return 'repay';
  }

  if (side === 'supply') {
    if (supplyAction === 'supply') {
      return 'supply';
    }

    return 'withdraw';
  }
};

const getClassNames = (active) => {
  if (active) {
    return 'inline-block text-sm px-16 py-4 border-mred bg-mred leading-none border rounded text-white hover:bg-mred mt-4 lg:mt-0';
  }

  return 'inline-block text-sm px-16 py-4 border-mred leading-none border rounded text-mred hover:text-white hover:bg-mred mt-4 lg:mt-0';
};

const Liquidity = () => {
  const [side, setSide] = useState('borrow');
  const [borrowAction, setBorrowAction] = useState('borrow'); // 'borrow', 'repay'
  const [supplyAction, setSupplyAction] = useState('supply'); // 'supply', 'withdraw'
  const [borrowInputAmount, setBorrowInputAmount] = useState('');
  const [repayInputAmount, setRepayInputAmount] = useState('');
  const [supplyInputAmount, setSupplyInputAmount] = useState('');
  const [withdrawInputAmount, setWithdrawInputAmount] = useState('');

  const [borrowBalance, setBorrowBalance] = useState(0); // amount in borrow contracts
  const [supplyBalance, setSupplyBalance] = useState(0); // amount in supply contracts

  const handleClickSide = () => {
    if (side === 'borrow') {
      setSide('supply');
    }

    if (side === 'supply') {
      setSide('borrow');
    }
  };

  const handleClickBorrowAction = () => {
    if (borrowAction === 'borrow') {
      setBorrowAction('repay');
    }

    if (borrowAction === 'repay') {
      setBorrowAction('borrow');
    }
  };

  const handleClickSupplyAction = () => {
    if (supplyAction === 'supply') {
      setSupplyAction('withdraw');
    }

    if (supplyAction === 'withdraw') {
      setSupplyAction('supply');
    }
  };

  const handleChangeBorrowAmount = (event) => {
    setBorrowInputAmount(event.target.value);
  };

  const handleClickBorrowMax = () => {
    // TODO: get max collateralization value
    setBorrowInputAmount();
  };

  const handleClickRepayMax = () => {
    // TODO: get amount borrowed in contract
    setRepayInputAmount();
  };

  const handleChangeSupplyAmount = (event) => {
    setSupplyInputAmount(event.target.value);
  };

  const handleClickSupplyMax = () => {
    // TODO: get max funds available in wallet
    setSupplyInputAmount();
  };

  const handleClickWithdrawMax = () => {
    // TODO: get amount supplied in contract
    setWithdrawInputAmount();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: compile transaction information
    // TODO: send transaction to network
  };

  const isSubmitDisabled = () => {
    const intent = getUserIntent(side, borrowAction, supplyAction);
    if (intent === 'borrow') {
      // TODO: borrowInputAmount > 0 and <= max collateralization value
    }

    if (intent === 'repay') {
      // TODO: repayInputAmount > 0 and <= max borrowed outstanding
    }

    if (intent === 'supply') {
      // TODO: supplyInputAmount > 0 and <= max funds in wallet
    }

    if (intent === 'withdraw') {
      // TODO: withdrawInputAmount > 0 and <= max supplied outstanding
    }

    return false;
  };

  const intent = getUserIntent(side, borrowAction, supplyAction);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-italic">Money Market</h1>
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="rounded-lg border-2 border-black p-8">
          <h2 className="text-2xl border-b-8 border-mred mb-2">Borrow</h2>
          <Statistic label="APY" value={`4%`} />
          <Statistic label="Total Borrowed" value={`$1,232,633`} />
          <Statistic label="24h Volume" value={`$52,342`} />
        </div>
        <div className="rounded-lg border-2 border-black p-8">
          <h2 className="text-2xl border-b-8 border-mred mb-2">Supply</h2>
          <Statistic label="APY" value={`4%`} />
          <Statistic label="Total Supplied" value={`$1,232,633`} />
          <Statistic label="24h Volume" value={`$52,342`} />
        </div>
      </div>
      <div className="text-center my-8 space-x-8">
        <Button label="BORROW" onClick={handleClickSide} className={getClassNames(side === 'borrow')} />
        <Button label="SUPPLY" onClick={handleClickSide} className={getClassNames(side === 'supply')} />
      </div>
      <div>
        <div className={`space-x-2 ${side === 'borrow' ? '' : 'hidden'}`}>
          <Button label="Borrow" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'borrow')} />
          <Button label="Repay" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'repay')} />
        </div>
        <div className={`space-x-2 ${side === 'supply' ? '' : 'hidden'}`}>
          <Button label="Supply" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'supply')} />
          <Button label="Withdraw" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'withdraw')} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={side === 'borrow' ? '' : 'hidden'}>
            <input type="text" className="border-b-2 border-black text-5xl" placeholder="0" value={borrowInputAmount} onChange={handleChangeBorrowAmount} />
            <Button label="max" onClick={borrowAction === 'borrow' ? handleClickBorrowMax : handleClickRepayMax} className="border border-mred rounded p-1 text-sm text-mred hover:text-mred"/>
          </div>
          <div className={side === 'supply' ? '' : 'hidden'}>
            <input type="text" className="border-b-2 border-black text-5xl" placeholder="0" value={supplyInputAmount} onChange={handleChangeSupplyAmount} />
            <Button label="max" onClick={supplyAction === 'supply' ? handleClickSupplyMax : handleClickWithdrawMax} className="border border-mred rounded p-1 text-sm text-mred hover:text-mred"/>
          </div>
          <Button label="Execute" disabled={isSubmitDisabled()} type="submit" className="inline-block text-xs px-4 py-2 border-mred bg-mred leading-none border rounded text-white hover:bg-mred mt-4 lg:mt-0" />
        </form>
      </div>
    </div>
  );
};

export { Liquidity };
