import * as React from "react";
import Button from "react-bootstrap/esm/Button";
import { connect } from "react-redux";
import { toLevel } from "../store/actions";
import { RootAction } from "../store/reducer";

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  onClick: () => dispatch(toLevel()),
});

type IntroScreenProps = ReturnType<typeof mapDispatchToProps>;

const _IntroScreen: React.FC<IntroScreenProps> = ({ onClick }) => {
  return (
    <div>
      <h3>Are you ready to</h3>
      <h1>chase your dreams?</h1>
      <br />
      <Button variant="primary" onClick={onClick}>
        Yes, I am ready!
      </Button>
    </div>
  );
};

export const IntroScreen = connect(null, mapDispatchToProps)(_IntroScreen);
