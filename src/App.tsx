import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { MainScreen } from "./components/mainView";
import { store } from "./store/store";

const App: React.FC = () => (
  <Provider store={store}>
    <div className="App">
      <MainScreen />
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
