import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { WalletButton } from '../components/WalletButton';

const LOGO_URL = process.env.PUBLIC_URL + '/logo.svg';
const WORDMARK_URL = process.env.PUBLIC_URL + '/wordmark.svg';

const Header = () => (
  <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    {/* <div className="flex flex-row justify-between sm:pt-8 sm:pb-8"> */}
    <Link to="/">
      <div class="flex items-center flex-shrink-0 mr-6">
        {/* TODO: replace tailwind logo with Maximus */}
        <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        <span class="font-semibold text-xl tracking-tight">Maximus</span>
      </div>
    </Link>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <Link to="/borrow" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Borrow
        </Link>
        <Link to="/liquidity" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
          Liquidity
        </Link>
        <Link to="/governance" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
          Governance
        </Link>
      </div>
      <div>
        <Link onClick={() => alert("TODO: Connect Metamask")} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
          Connect Wallet
        </Link>
      </div>
    </div>
  </nav >
);

export { Header };
