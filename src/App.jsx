import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Success from "./Components/Success";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/success" component={Success} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
