import React, { useState } from 'react';

import { Button } from '../components/Button';
import { Statistic } from '../components/Statistic';

const getSubmitButtonClassNames = (status) => {
  if (status === 'invalid') {
    return "border bg-gray-400 border-gray-400 rounded p-3 text-sm text-white cursor-not-allowed"
  }

  return "border bg-mred border-mred rounded p-3 text-sm text-white";
};

// percentage
const getCollateralizationRatio = (eth, ethPrice, usdm) => (Number(eth) * ethPrice) / Number(usdm);

const getCollateralizationRatioCopy = (eth, ethPrice, usdm) => {
  if (!eth || !usdm) {
    return '---%';
  }

  const percentage = getCollateralizationRatio(eth, ethPrice, usdm);
  return `${percentage}%`;
};

const getStatus = (eth, ethPrice, usdm) => {
  if (!eth || !usdm) {
    return 'invalid';
  }

  const ratio = getCollateralizationRatio(eth, ethPrice, usdm);
  console.log(ratio);
  if (ratio < MINIMUM_RATIO) {
    return 'invalid';
  }

  return 'valid';
};

const getETHPriceCopy = (ethPrice) => `$${(ethPrice / 100).toFixed(2)}`;

const MINIMUM_RATIO = 150; // percentage

const Manage = () => {
  const [cdps, setCDPs] = useState([]);
  const ethPrice = 15000; // in cents
  const [eth, setETH] = useState(''); // in whole units
  const [usdm, setUSDM] = useState(''); // in whole units

  const handleChangeETH = (e) => setETH(e.target.value);
  const handleChangeUSDM = (e) => setUSDM(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call contract and Mint USDM
  };

  const status = getStatus(eth, ethPrice, usdm);
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-italic">Minting</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-48">
        <div className="space-y-4">
          <Statistic label="Current ETH/USD Price" value={getETHPriceCopy(ethPrice)} />
          <Statistic label="Minting Fee (APY)" value={"5%"} />
          <Statistic label="Minimum Collateralization Ratio" value={`${MINIMUM_RATIO}%`} />
          <Statistic label="Your Collateralization Ratio" value={getCollateralizationRatioCopy(eth, ethPrice, usdm)} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <input type="text" className="border-b-2 border-black text-5xl" placeholder="0.000" value={eth} onChange={handleChangeETH} />
              <span className="text-xs font-bold">ETH for collateral</span>
            </div>
            <div className="flex flex-col">
              <input type="text" className="border-b-2 border-black text-5xl" placeholder="0.000" value={usdm} onChange={handleChangeUSDM} />
              <span className="text-xs font-bold">USDM to mint</span>
            </div>
            <Button type="submit" label="Mint" disabled={status === "invalid"} className={getSubmitButtonClassNames(status)} />
          </div>
        </form>
      </div>
    </div>
  );
};

export { Manage };
