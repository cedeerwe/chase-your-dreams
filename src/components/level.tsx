import { GameLevel } from "../game/newLevel";
import { State } from "../store/state";
import { connect } from "react-redux";
import * as React from "react";
import { Board } from "./board";
import { ArrowKeys } from "./arrowKeys";
import { RestartButton } from "./restartButton";
import Button from "react-bootstrap/esm/Button";
import { RootAction } from "../store/reducer";
import { toSummary } from "../store/actions";
import { Stars } from "./stars";

type Props = {
  level: GameLevel;
} & ReturnType<typeof mapDispatchToProps>;

const _Level: React.FC<Props> = ({ level, clickToSummary }) => {
  return (
    <div>
      <h1>{level.description.name}</h1>
      <h3>Current round: {level.data.round}</h3>
      <h3>
        Best result:{" "}
        {level.data.bestResult === undefined
          ? "-"
          : level.data.bestResult.toString()}
      </h3>
      <Stars
        bestResult={level.data.bestResult}
        thresholds={level.description.thresholds}
      />
      <br />
      <Board />
      <br />
      <ArrowKeys />
      <br />
      <RestartButton />
      <Button variant="secondary" onClick={clickToSummary}>
        To summary
      </Button>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  level: state.levels[state.activeLevel],
});

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  clickToSummary: () => dispatch(toSummary()),
});

export const Level = connect(mapStateToProps, mapDispatchToProps)(_Level);
