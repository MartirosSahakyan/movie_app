import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
let isAuth = localStorage.getItem('isAuth')
export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <LoginPage  />
          </Route>
          <Route path='/home'>
            <HomePage  />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
