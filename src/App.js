import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicTacToe from "./Components/TicTacToe";
import NavigationBar from "./Components/NavigationBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" component={TicTacToe} />
      </Switch>
    </Router>
  );
}

export default App;
