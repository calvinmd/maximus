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
    return 'inline-block text-sm px-4 py-2 border-teal-500 bg-teal-500 leading-none border rounded text-white hover:bg-teal-600 mt-4 lg:mt-0';
  }

  return 'inline-block text-sm px-4 py-2 border-teal-500 leading-none border rounded text-teal-500 hover:text-white hover:bg-teal-500 mt-4 lg:mt-0';
};

const Liquidity = () => {
  const [side, setSide] = useState('borrow');
  const [borrowAction, setBorrowAction] = useState('borrow');
  const [supplyAction, setSupplyAction] = useState('supply');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  const [supplyAmount, setSupplyAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

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
    setBorrowAmount(event.target.value);
  };

  const handleClickBorrowMax = () => {
    // TODO: get max collateralization value
    setBorrowAmount();
  };

  const handleClickRepayMax = () => {
    // TODO: get amount borrowed in contract
    setRepayAmount();
  };

  const handleChangeSupplyAmount = (event) => {
    setSupplyAmount(event.target.value);
  };

  const handleClickSupplyMax = () => {
    // TODO: get max funds available in wallet
    setSupplyAmount();
  };

  const handleClickWithdrawMax = () => {
    // TODO: get amount supplied in contract
    setWithdrawAmount();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: compile transaction information
    // TODO: send transaction to network
  };

  const isSubmitDisabled = () => {
    const intent = getUserIntent(side, borrowAction, supplyAction);
    if (intent === 'borrow') {
      // TODO: borrowAmount > 0 and <= max collateralization value
    }

    if (intent === 'repay') {
      // TODO: repayAmount > 0 and <= max borrowed outstanding
    }

    if (intent === 'supply') {
      // TODO: supplyAmount > 0 and <= max funds in wallet
    }

    if (intent === 'withdraw') {
      // TODO: withdrawAmount > 0 and <= max supplied outstanding
    }

    return false;
  };

  const intent = getUserIntent(side, borrowAction, supplyAction);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-italic">Money Market</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-48">
        <div>
          <h2 className="text-2xl">Borrow</h2>
          <Statistic label="APY" value={`4%`} />
          <Statistic label="Total" value={`$1,232,633`} />
          <Statistic label="24h Volume" value={`$52,342`} />
        </div>
        <div>
          <h2 className="text-2xl">Supply</h2>
          <Statistic label="APY" value={`4%`} />
          <Statistic label="Total" value={`$1,232,633`} />
          <Statistic label="24h Volume" value={`$52,342`} />
        </div>
      </div>
      <div>
        <Button label="Borrow" onClick={handleClickSide} className={getClassNames(side === 'borrow')} />
        <Button label="Supply" onClick={handleClickSide} className={getClassNames(side === 'supply')} />
      </div>
      <div>
        <div className={side === 'borrow' ? '' : 'hidden'}>
          <Button label="Borrow" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'borrow')} />
          <Button label="Repay" onClick={handleClickBorrowAction} className={getClassNames(borrowAction === 'repay')} />
        </div>
        <div className={side === 'supply' ? '' : 'hidden'}>
          <Button label="Supply" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'supply')} />
          <Button label="Withdraw" onClick={handleClickSupplyAction} className={getClassNames(supplyAction === 'withdraw')} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={side === 'borrow' ? '' : 'hidden'}>
            <input type="text" className="text-5xl" placeholder="0" value={borrowAmount} onChange={handleChangeBorrowAmount} />
            <Button label="MAX" onClick={borrowAction === 'borrow' ? handleClickBorrowMax : handleClickRepayMax} className="border border-teal-500 rounded p-1 text-sm text-teal-500 hover:text-teal-700"/>
          </div>
          <div className={side === 'supply' ? '' : 'hidden'}>
            <input type="text" className="text-5xl" placeholder="0" value={supplyAmount} onChange={handleChangeSupplyAmount} />
            <Button label="MAX" onClick={supplyAction === 'supply' ? handleClickSupplyMax : handleClickWithdrawMax} className="border border-teal-500 rounded p-1 text-sm text-teal-500 hover:text-teal-700"/>
          </div>
          <Button label="Execute" disabled={isSubmitDisabled()} type="submit" className="inline-block text-sm px-4 py-2 border-teal-500 bg-teal-500 leading-none border rounded text-white hover:bg-teal-600 mt-4 lg:mt-0" />
        </form>
      </div>
    </div>
  );
};

export { Liquidity };
