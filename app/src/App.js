import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Layout } from './layouts/Layout';
import { Home as HomePage } from './pages/Home';
import { Borrow as BorrowPage } from './pages/Borrow';
import { Liquidity as LiquidityPage } from './pages/Liquidity';
import { Governance as GovernancePage } from './pages/Governance';
import { Manage as ManagePage } from './pages/Manage';
import { Playground as PlaygroundPage } from './pages/Playground';


const App = () => (
  <Switch>
    <Layout>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/borrow' component={BorrowPage} />
      <Route exact path='/liquidity' component={LiquidityPage} />
      <Route exact path='/governance' component={GovernancePage} />
      <Route exact path='/manage' component={ManagePage} />
      <Route exact path='/playground' component={PlaygroundPage} />
    </Layout>
  </Switch>
);

export default App;
