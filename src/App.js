import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TablePage from "./pages/TablePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={TablePage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
