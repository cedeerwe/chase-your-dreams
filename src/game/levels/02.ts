import { GameBoard, WallTile, GameLevel } from "../newLevel";
import { MoveAction } from "../position";

const board = GameBoard.newAllNoRule(6, 6)
  .update({ x: 5, y: 5 }, new WallTile([MoveAction.Down, MoveAction.Left]))
  .update({ x: 0, y: 5 }, new WallTile([MoveAction.Down]))
  .update({ x: 1, y: 5 }, new WallTile([MoveAction.Down]))
  .update({ x: 2, y: 5 }, new WallTile([MoveAction.Down]))
  .update({ x: 3, y: 5 }, new WallTile([MoveAction.Down]))
  .update({ x: 4, y: 5 }, new WallTile([MoveAction.Down, MoveAction.Right]))
  .update({ x: 4, y: 0 }, new WallTile([MoveAction.Right]))
  .update({ x: 4, y: 1 }, new WallTile([MoveAction.Right]))
  .update({ x: 4, y: 2 }, new WallTile([MoveAction.Right]))
  .update({ x: 4, y: 3 }, new WallTile([MoveAction.Right]))
  .update({ x: 4, y: 4 }, new WallTile([MoveAction.Right, MoveAction.Up]))
  .update({ x: 3, y: 4 }, new WallTile([MoveAction.Up]))
  .update({ x: 2, y: 4 }, new WallTile([MoveAction.Up]))
  .update({ x: 1, y: 4 }, new WallTile([MoveAction.Up]))
  .update({ x: 0, y: 4 }, new WallTile([MoveAction.Up]))
  .update({ x: 5, y: 4 }, new WallTile([MoveAction.Left, MoveAction.Up]))
  .update({ x: 5, y: 3 }, new WallTile([MoveAction.Left]))
  .update({ x: 5, y: 2 }, new WallTile([MoveAction.Left]))
  .update({ x: 5, y: 1 }, new WallTile([MoveAction.Left]))
  .update({ x: 5, y: 0 }, new WallTile([MoveAction.Left]));

export const level2 = GameLevel.new({
  name: "Not so straightforward",
  thresholds: {
    twoStar: 6,
    threeStar: 2,
  },
  startingPositions: {
    player: { x: 0, y: 0 },
    goal: { x: 5, y: 5 },
  },
  board,
});
