import { PlayerBoard } from "../game/board";

export enum LevelName {
  Intro = "Intro",
}

export type BoardPosition = [number, number];

export type Round = number;

export type Level = {
  name: LevelName;
  board: PlayerBoard;
  round: Round;
  bestResult: Round | undefined;
};

export enum View {
  Summary,
  Level,
  Intro,
}
