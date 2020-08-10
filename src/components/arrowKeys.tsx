import Button from "react-bootstrap/Button";
import * as React from "react";
import { arrowUp, arrowLeft, arrowRight, arrowDown } from "../store/actions";
import { connect } from "react-redux";

import { RootAction } from "../store/reducer";
import { State } from "../store/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state: State) => ({
  active: state.levels[state.activeLevel].data.active,
});

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  onClickArrowUp: () => dispatch(arrowUp()),
  onClickArrowDown: () => dispatch(arrowDown()),
  onClickArrowLeft: () => dispatch(arrowLeft()),
  onClickArrowRight: () => dispatch(arrowRight()),
});

type ArrowKeysProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const _ArrowKeys: React.FC<ArrowKeysProps> = ({
  onClickArrowDown,
  onClickArrowLeft,
  onClickArrowRight,
  onClickArrowUp,
  active,
}) => {
  return (
    <div>
      <div>
        <Button variant="primary" onClick={onClickArrowUp} disabled={!active}>
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      </div>
      <div>
        <Button variant="primary" onClick={onClickArrowLeft} disabled={!active}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>{" "}
        <Button
          variant="primary"
          onClick={onClickArrowRight}
          disabled={!active}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
      <div>
        <Button variant="primary" onClick={onClickArrowDown} disabled={!active}>
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      </div>
    </div>
  );
};

export const ArrowKeys = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArrowKeys);
