import React from "react";
import { Switch, Route } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import drizzleOptions from "./drizzleOptions";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";

const drizzle = new Drizzle(drizzleOptions);

const App = () => (
  <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/borrow" component={Home} />
        <Route exact path="/liquidity" component={Home} />
        <Route exact path="/governance" component={Home} />
        </Layout>
    </Switch>
  </drizzleReactHooks.DrizzleProvider>
);

export default App;
