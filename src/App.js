import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./constants/routes";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path={Routes.loginPage.url}
            component={Routes.loginPage.component}
          />
          <Route
            exact
            path={Routes.signUp.url}
            component={Routes.signUp.component}
          />
          <Route
            path={Routes.homePage.url}
            component={Routes.homePage.component}
          />
        </Switch>
      </Router>
    </>
  );
}
