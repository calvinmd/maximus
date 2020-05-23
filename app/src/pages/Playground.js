import React from 'react'

import * as util from '../util'

const style = { border: '1px solid black', padding: '10px 20px' }

const Row = ({ children }) => (
  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
    {children}
  </div>
)

const Playground = () => {
  return (
    <div>
      <div>
        {Object.entries(util)
          .filter(([key, method]) => !['comptroller', 'mUSDM', 'USDM', 'mETH'].includes(key))
          .map(([key, method]) => {
          return (
            <Row key={key}>
              <label>{method.description || key}</label>
              <button style={style} onClick={() => {
                method(...method.exampleParams)
              }}>{key}</button>
            </Row>
          )
        })}
      </div>
    </div>
  )
}

export { Playground }
