import React, { FC } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import s from "./App.module.scss";
import ExternalRedirect from "./components/ExternalRedirect/ExternalRedirect";
import Layout from "./components/Layout/Layout";
import { LocationState } from "./models/RouteParams";
import Cart from "./pages/Cart/Cart";

const App: FC = () => {
  const location = useLocation<LocationState>();
  return (
    <div className={s.app}>
      <Layout>
        <Switch>
          <Route exact path="/catalog/">
            <Cart />
          </Route>
          <ExternalRedirect
            exact
            path="/redirect_page"
            link={location?.state?.externalLink || "/"}
          />
          <Route path="*">
            <Redirect to="/catalog/" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
