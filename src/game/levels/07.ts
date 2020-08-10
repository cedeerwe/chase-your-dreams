import { GameBoard, GameLevel, WallTileGoalMirror } from "../newLevel";
import { MoveAction } from "../position";

const board = GameBoard.newAllNoRuleGoalMirror(6, 6)
  .update({ x: 0, y: 0 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 1, y: 0 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 2, y: 0 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 3, y: 0 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 5, y: 0 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 0, y: 1 }, new WallTileGoalMirror([MoveAction.Down]))
  .update(
    { x: 1, y: 1 },
    new WallTileGoalMirror([MoveAction.Down, MoveAction.Up])
  )
  .update({ x: 2, y: 1 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 3, y: 1 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 5, y: 1 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 0, y: 4 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 1, y: 4 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 3, y: 4 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 4, y: 4 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 5, y: 4 }, new WallTileGoalMirror([MoveAction.Up]))
  .update({ x: 0, y: 5 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 1, y: 5 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 3, y: 5 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 4, y: 5 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 5, y: 5 }, new WallTileGoalMirror([MoveAction.Down]))
  .update({ x: 1, y: 2 }, new WallTileGoalMirror([MoveAction.Down]));

export const level7 = GameLevel.new({
  name: "Dream in the mirror",
  thresholds: {
    twoStar: 13,
    threeStar: 9,
  },
  startingPositions: {
    player: { x: 0, y: 0 },
    goal: { x: 0, y: 5 },
  },
  board,
});
