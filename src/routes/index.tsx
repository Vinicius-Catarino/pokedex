import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Details from "../pages/Details";
import Favorites from "../pages/Favorites";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/pokemon/:pokemonId" exact component={Details} />
    <Route path="/favorites" exact component={Favorites} />
  </Switch>
);

export default Routes;
