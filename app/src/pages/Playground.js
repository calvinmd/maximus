import React from 'react'

import {
  enterMarkets,
  lendETH,
  lendUSDM,
  borrowUSDM,
} from '../util'

const style = { border: '1px solid black', padding: '10px 20px' }

const Row = ({ children }) => (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
    {children}
  </div>
)

const Playground = () => {
  const [lendEthAmount, setLendEthAmount] = React.useState(1)
  const [lendUSDMAmount, setLendUSDMAmount] = React.useState(1)
  const [borrowUSDMAmount, setBorrowUSDMAmount] = React.useState(1)
  return (
    <div>
      <div>
        <Row>
          <label>Authorize the money market application.</label>
          <button style={style} onClick={() => enterMarkets()}>enterMarkets</button>
        </Row>
        <Row>
          <label>Lend Eth for interest, and/or lock for collateral to borrow USDM later.</label>
          <input className="border-b-2 border-black text-5xl" placeholder="0.000" type="number" value={lendEthAmount} onChange={(val) => setLendEthAmount(val)} />
          <button style={style} onClick={() => lendETH(lendEthAmount)}>lendETH</button>
        </Row>
        <Row>
          <label>Lend USDM</label>
          <input className="border-b-2 border-black text-5xl" placeholder="0.000" type="number" value={lendUSDMAmount} onChange={(val) => setLendUSDMAmount(val)} />
          <button style={style} onClick={() => lendUSDM(lendUSDMAmount)}>lendUSDM</button>
        </Row>
        <Row>
          <label>Lend USDM</label>
          <input className="border-b-2 border-black text-5xl" placeholder="0.000" type="number" value={borrowUSDMAmount} onChange={(val) => setBorrowUSDMAmount(val)} />
          <button style={style} onClick={() => borrowUSDM(borrowUSDMAmount)}>borrowUSDM</button>
        </Row>
      </div>
    </div>
  )
}

export { Playground }
