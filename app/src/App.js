import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';

import drizzleOptions from './drizzleOptions';
import { Layout } from './layouts/Layout';
import { Home as HomePage } from './pages/Home';
import { Borrow as BorrowPage } from './pages/Borrow';
import { Liquidity as LiquidityPage } from './pages/Liquidity';
import { Governance as GovernancePage } from './pages/Governance';

const drizzle = new Drizzle(drizzleOptions);

const App = () => (
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <Switch>
      <Layout>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/borrow' component={BorrowPage} />
        <Route exact path='/liquidity' component={LiquidityPage} />
        <Route exact path='/governance' component={GovernancePage} />
        </Layout>
    </Switch>
  </drizzleReactHooks.DrizzleProvider>
);

export default App;
