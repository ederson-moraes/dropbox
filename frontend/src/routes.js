import { BrowserRouter, Route, Switch } from "react-router-dom";   

import Main from "./pages/Main";
import Box from "./pages/Box";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/boxes/:id" component={Box} />
    </Switch>
  </BrowserRouter>
);

export default Routes;