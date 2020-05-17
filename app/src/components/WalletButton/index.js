import React, { useState, useEffect } from 'react';
import { get } from "lodash";
import { Button } from '../Button';

// Map supports integer keys and faster in general
const networkName = new Map();
networkName.set(1, 'Main Net');
networkName.set(3, 'Ropsten');
networkName.set(4, 'Rinkeby');
networkName.set(5, 'Goerli');
networkName.set(42, 'Kovan');
networkName.set(8545, 'Localhost');

const WalletButton = () => {
  const [addressChangeCount, setAddressChangeCount] = useState(0);
  const [networkChangeCount, setNetworkChangeCount] = useState(0);
  console.log('Address changed ', addressChangeCount, ' times.');
  console.log('Network changed ', networkChangeCount, ' times.');
  const hasEthereum = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  const selectedAddress = get(window, 'ethereum.selectedAddress');
  const networkId = Number(get(window, 'ethereum.networkVersion'));

  let onClick = () => { };
  let buttonLabel = "Checking connection...";

  if (!hasEthereum) {
    console.log('No metamask installed');
    buttonLabel = "Install Metamask";
    onClick = () => window.open("https://metamask.io/");
  } else if (selectedAddress && networkId) {
    console.log('Wallet connected');
    buttonLabel = `${selectedAddress} (${networkName.get(networkId)})`;
  } else {
    buttonLabel = "Connect Wallet";
    onClick = () => {
      console.log("Enable wallet");
      window.ethereum.enable();
    };
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', (account) => {
      console.log('accountsChanged: ', account);
      setAddressChangeCount(addressChangeCount + 1);
    });
  }, [typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.selectedAddress]);

  useEffect(() => {
    window.ethereum.on('networkChanged', (network) => {
      console.log('networkChanged ', network);
      setNetworkChangeCount(networkChangeCount + 1);
    });
  }, [typeof window !== 'undefined' && typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion]);

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
