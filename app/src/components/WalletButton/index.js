import React from 'react';

import { Button } from '../Button';

const VALID_STATUSES = ['unconnected', 'connected'];

const getStatus = (metamaskConnection) => {
  // need to get current wallet state from metamask
  return 'unconnected';
};

const WalletButton = () => {

  const status = getStatus(null);

  if (status === 'connected') {
    return (
      <Button type="button">
        YOUR WALLET
      </Button>
    );
  }

  return (
    <Button type="button" label="Connect Wallet" />
  );
};

export { WalletButton };
