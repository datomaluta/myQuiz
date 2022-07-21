import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import History from "./pages/History";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/history">
          <History />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
