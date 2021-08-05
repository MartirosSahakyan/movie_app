import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage/SignUp";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/signUp">
            <SignUp />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
