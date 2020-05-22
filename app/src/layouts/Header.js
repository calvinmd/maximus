import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { WalletButton } from '../components/WalletButton';

const LOGO_URL = process.env.PUBLIC_URL + '/logo.svg';
const WORDMARK_URL = process.env.PUBLIC_URL + '/wordmark.svg';

const HEADER_BUTTON_CLASS = "block mt-4 lg:inline-block lg:mt-0 text-mred mr-4 text-lg";
const HEADER_BUTTON_ACTIVE_CLASS = "border-b-4 border-mred font-medium";

const Header = () => (
  <nav className="flex items-center justify-between flex-wrap">
    <Link to="/">
      <div className="flex items-center flex-shrink-0 mr-16">
        <img className="h-10 w-10" src={LOGO_URL} />
        <img className="ml-2 h-8" src={WORDMARK_URL} />
      </div>
    </Link>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <NavLink to="/borrow" className={HEADER_BUTTON_CLASS} activeClassName={HEADER_BUTTON_ACTIVE_CLASS}>
          Borrow
        </NavLink>
        <NavLink to="/liquidity" className={HEADER_BUTTON_CLASS} activeClassName={HEADER_BUTTON_ACTIVE_CLASS}>
          Liquidity
        </NavLink>
        <NavLink to="/governance" className={HEADER_BUTTON_CLASS} activeClassName={HEADER_BUTTON_ACTIVE_CLASS}>
          Governance
        </NavLink>
        <NavLink to="/manage" className={HEADER_BUTTON_CLASS} activeClassName={HEADER_BUTTON_ACTIVE_CLASS}>
          Manage
        </NavLink>
        <NavLink to="/playground" className={HEADER_BUTTON_CLASS} activeClassName={HEADER_BUTTON_ACTIVE_CLASS}>
          Playground
        </NavLink>
      </div>
      <div>
        <WalletButton />
      </div>
    </div>
  </nav >
);

export { Header };
