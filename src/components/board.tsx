import * as React from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { BoardTile } from "../game/board";
import { State } from "../store/state";

type Props = ReturnType<typeof mapStateToProps>;

const _Board: React.FC<Props> = ({ level }) => {
  return (
    <div>
      <Table style={{ width: 500, margin: "auto" }}>
        <tbody>
          {level.tableIterator().map((row, i) => (
            <tr key={`tr ${i}`}>
              {row.map((tile, j) => (
                <td
                  style={{
                    backgroundColor:
                      tile === BoardTile.Player
                        ? "blue"
                        : tile === BoardTile.Goal
                        ? "red"
                        : "white",
                    width: "4em",
                    height: "4em",
                    border: "solid 2px",
                    borderColor: "black",
                  }}
                  key={`td ${j}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  level: state.levels[state.activeLevel],
});

export const Board = connect(mapStateToProps)(_Board);
