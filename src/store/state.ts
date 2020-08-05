import { Level, LevelName } from "./types";
import { PlayerBoard } from "../game/board";
import { BoardPosition } from "../game/position";

export type State = {
  levels: Level[];
  activeLevel: number;
};

const board1 = new PlayerBoard(
  5,
  5,
  new BoardPosition(0, 0),
  new BoardPosition(3, 2)
);
export const initialState: State = {
  levels: [
    {
      name: LevelName.Intro,
      board: board1,
      round: 0,
      bestResult: undefined,
    },
  ],
  activeLevel: 0,
};
