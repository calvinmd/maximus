import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { WalletButton } from '../components/WalletButton';

const LOGO_URL = process.env.PUBLIC_URL + '/logo.svg';
const WORDMARK_URL = process.env.PUBLIC_URL + '/wordmark.svg';

const Header = () => (
  <div className="flex flex-row justify-between sm:pt-8 sm:pb-8">
    <div>
      <Link to="/">
        <img className="sm:hidden" src={LOGO_URL} />
        <img className="hidden sm:block" src={WORDMARK_URL} />
      </Link>
    </div>
    <div>
      <NavLink to='/borrow' activeClassName='link-active'>Borrow</NavLink>
      <NavLink to='/liquidity' activeClassName='link-active'>Liquidity</NavLink>
      <NavLink to='/governance' activeClassName='link-active'>Governance</NavLink>
    </div>
    <WalletButton />
  </div>
);

export { Header };
