import * as React from "react";
import { connect } from "react-redux";
import { State } from "../store/state";
import { View } from "../store/types";
import { IntroScreen } from "./introScreen";
import { Level } from "./level";
import { Summary } from "./summary";

type IntroScreenProps = ReturnType<typeof mapStateToProps>;

const _MainScreen: React.FC<IntroScreenProps> = ({ view }) => {
  switch (view) {
    case View.Intro:
      return <IntroScreen />;
    case View.Level:
      return <Level />;
    case View.Summary:
      return <Summary />;
  }
};

const mapStateToProps = (state: State) => ({
  view: state.view,
});

export const MainScreen = connect(mapStateToProps)(_MainScreen);
