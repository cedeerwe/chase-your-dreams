import Button from "react-bootstrap/Button";
import * as React from "react";
import { arrowUp, arrowLeft, arrowRight, arrowDown } from "../store/actions";
import { connect } from "react-redux";

import { RootAction } from "../store/reducer";

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  onClickArrowUp: () => dispatch(arrowUp()),
  onClickArrowDown: () => dispatch(arrowDown()),
  onClickArrowLeft: () => dispatch(arrowLeft()),
  onClickArrowRight: () => dispatch(arrowRight()),
});

type ArrowKeysProps = ReturnType<typeof mapDispatchToProps>;

const _ArrowKeys: React.FC<ArrowKeysProps> = ({
  onClickArrowDown,
  onClickArrowLeft,
  onClickArrowRight,
  onClickArrowUp,
}) => {
  return (
    <div>
      <div>
        <Button variant="primary" onClick={onClickArrowUp}>
          Up
        </Button>
      </div>
      <div>
        <Button variant="primary" onClick={onClickArrowLeft}>
          Left
        </Button>
        <Button variant="primary" onClick={onClickArrowRight}>
          Right
        </Button>
      </div>
      <div>
        <Button variant="primary" onClick={onClickArrowDown}>
          Down
        </Button>
      </div>
    </div>
  );
};

export const ArrowKeys = connect(null, mapDispatchToProps)(_ArrowKeys);
