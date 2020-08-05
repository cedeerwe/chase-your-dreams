import { State } from "../store/state";
import { Level } from "../store/types";
import { MoveAction } from "./position";

export enum LevelName {
  Intro = "Intro",
}

function levelZeroLogic(level: Level, move: MoveAction): Level {
  return {
    ...level,
    board: level.board.movePlayer(
      level.board.player
        .move(move)
        .modulate(level.board.height, level.board.width)
    ),
  };
}

export function mainLogic(state: State, move: MoveAction): State {
  if (state.activeLevel === 0) {
    return {
      ...state,
      levels: state.levels.map((level, i) =>
        i === 0 ? levelZeroLogic(level, move) : level
      ),
    };
  } else {
    return state;
  }
}
