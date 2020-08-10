import * as React from "react";
import Table from "react-bootstrap/esm/Table";
import { connect } from "react-redux";
import { toSpecificLevel } from "../store/actions";
import { RootAction } from "../store/reducer";
import { State } from "../store/state";
import { Stars } from "./stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/esm/Button";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const mapDispatchToProps = (dispatch: React.Dispatch<RootAction>) => ({
  onClick: (levelId: number) => dispatch(toSpecificLevel(levelId)),
});

const mapStateToProps = (state: State) => ({
  levels: state.levels,
});

type SummaryProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const _Summary: React.FC<SummaryProps> = ({ onClick, levels }) => {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Level name</th>
            <th>Best result</th>
            <th>Rating</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((level, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{level.description.name}</td>
              <td>{level.data.bestResult}</td>
              <td>
                <Stars
                  bestResult={level.data.bestResult}
                  thresholds={level.description.thresholds}
                />
              </td>
              <td>
                <Button variant="primary" onClick={() => onClick(i)}>
                  <FontAwesomeIcon icon={faPlay} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export const Summary = connect(mapStateToProps, mapDispatchToProps)(_Summary);
