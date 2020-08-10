import * as React from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { restartLevel } from "../store/actions";
import { RootAction } from "../store/reducer";

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  onClick: () => dispatch(restartLevel()),
});

type RestartButtonProps = ReturnType<typeof mapDispatchToProps>;

const _RestartButton: React.FC<RestartButtonProps> = ({ onClick }) => {
  return (
    <div>
      <Button variant="secondary" onClick={onClick}>
        Restart Level
      </Button>
    </div>
  );
};

export const RestartButton = connect(null, mapDispatchToProps)(_RestartButton);
