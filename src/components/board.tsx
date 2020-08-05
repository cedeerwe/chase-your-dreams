import * as React from "react";
import Table from "react-bootstrap/Table";
import { State } from "../store/state";
import { connect } from "react-redux";
import { PlayerBoard, BoardTile } from "../game/board";

type Props = {
  board: PlayerBoard;
};

const _Board: React.FC<Props> = ({ board }) => {
  return (
    <div>
      <Table>
        {board.tableIterator().map((row) => (
          <tr>
            {row.map((tile) => (
              <td>
                {tile === BoardTile.Player
                  ? "P"
                  : tile === BoardTile.Goal
                  ? "G"
                  : "x"}
              </td>
            ))}
          </tr>
        ))}
      </Table>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  board: state.levels[state.activeLevel].board,
});

export const Board = connect(mapStateToProps)(_Board);
