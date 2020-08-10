import { GameBoard, GameLevel, WallTileGoalCopy } from "../newLevel";
import { MoveAction } from "../position";

const board = GameBoard.newAllNoRuleGoalCopy(6, 6)
  .update({ x: 1, y: 0 }, new WallTileGoalCopy([MoveAction.Down]))
  .update({ x: 1, y: 5 }, new WallTileGoalCopy([MoveAction.Up]))
  .update({ x: 4, y: 4 }, new WallTileGoalCopy([MoveAction.Right]))
  .update({ x: 5, y: 4 }, new WallTileGoalCopy([MoveAction.Left]));

export const level6 = GameLevel.new({
  name: "Run dream, run!",
  thresholds: {
    twoStar: 10,
    threeStar: 7,
  },
  startingPositions: {
    player: { x: 0, y: 0 },
    goal: { x: 1, y: 1 },
  },
  board,
});
