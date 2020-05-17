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
networkName.set(5777, 'Maximus Local');

const getAddressLabel = (addr) => `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`

const WalletButton = () => {
  const [count, setCount] = useState(0);
  console.log('Change count: ', count);
  const hasEthereum = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  const selectedAddress = get(window, 'ethereum.selectedAddress', '');
  const networkId = Number(get(window, 'ethereum.networkVersion'));
  console.log('networkId: ', networkId);

  let onClick = () => { };
  let buttonLabel = "Checking connection...";

  if (!hasEthereum) {
    console.log('No metamask installed');
    buttonLabel = "Install Metamask";
    onClick = () => window.open("https://metamask.io/");
  } else if (selectedAddress && networkId) {
    console.log('Wallet connected');
    buttonLabel = `${getAddressLabel(selectedAddress)} (${networkName.get(networkId) || 'Unknown'})`;
    onClick = () => {
      if (get(window, 'navigator.clipboard.writeText')) {
        window.navigator.clipboard.writeText(selectedAddress).then(function () {
          alert("Contract address copied to clipboard: " + selectedAddress);
        }, function (err) {
          console.error('Could not copy contract address to clipboard: ', err);
        });
      }
    };
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
      setCount(count + 1);
    });
    if (hasEthereum && !networkId) {
      // Network ID not retrieved yet, wait a bit then try again
      setTimeout(() => {
        console.log("Wait for networkId to become available...");
        setCount(count + 1);
      }, 1000);
    }
  }, [count, networkId, hasEthereum, selectedAddress]);

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
