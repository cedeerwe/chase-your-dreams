import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Board } from "./components/board";
import { ArrowKeys } from "./components/arrowKeys";

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <Board />
      <ArrowKeys />
    </div>
  </Provider>
);

export default App;

// TODO:
// class for board and its management
// class for describing moves via chain-like syntax
//
// moveUp()
//  .checkWall(walls)
//  .modulize()
//  .reactWithGoal()
// ... etc
