import React from 'react'

import {
  enterMarketUSDM,
  lendETH,
  lendUSDM,
  borrowUSDM,
} from '../util'


const Playground = () => {
  return (
    <div>
      <h1>Playground</h1>

      <button style={{ border: '1px solid black', padding: '20px' }} onClick={() => enterMarketUSDM()}>enterMarketUSDM</button>
      <button style={{ border: '1px solid black', padding: '20px' }} onClick={() => lendETH(1)}>lendETH</button>
      <button style={{ border: '1px solid black', padding: '20px' }} onClick={() => lendUSDM(1)}>lendUSDM</button>
      <button style={{ border: '1px solid black', padding: '20px' }} onClick={() => borrowUSDM(1)}>borrowUSDM</button>
    </div>
  );
};

export { Playground };
