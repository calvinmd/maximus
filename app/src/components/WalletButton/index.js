import React from 'react';

import { Button } from '../Button';

const networkName = new Map();
networkName.set(1, 'Main Net');
networkName.set(3, 'Ropsten');
networkName.set(4, 'Rinkeby');
networkName.set(5, 'Goerli');
networkName.set(42, 'Kovan');
networkName.set(8545, 'Localhost');

const WalletButton = () => {

  let onClick = () => { };
  let buttonLabel = "Connect Wallet";

  if (typeof window.ethereum === 'undefined') {
    console.log('No metamask installed');
    buttonLabel = "Install Metamask";
    onClick = () => window.open("https://metamask.io/");
  } else if (
    window &&
    window.ethereum &&
    window.ethereum.selectedAddress
  ) {
    console.log('Wallet connected');
    const address = window.ethereum.selectedAddress;
    const networkId = Number(window.ethereum.networkVersion);
    buttonLabel = `${address} (${networkName.get(networkId)})`;
  } else {
    onClick = () => {
      console.log("Enable wallet");
      window.ethereum.enable();
    };
  }
  console.log('zzz buttonLabel: ', buttonLabel);
  console.log('zzz onClick: ', onClick);
  return (
    <Button
      type="button"
      onClick={onClick}
      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      label={buttonLabel}
    />
  );
};

export { WalletButton };
