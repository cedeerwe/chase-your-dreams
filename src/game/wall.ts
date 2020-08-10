import { BoardPosition, MoveAction } from "./position";

export class Wall {
  constructor(private position: BoardPosition, private move: MoveAction) {}

  public hit(position: BoardPosition, move: MoveAction): boolean {
    return (
      position.x === this.position.x &&
      position.y === this.position.y &&
      move === this.move
    );
  }

  public mirror(): Wall {
    return new Wall(this.position.move(this.move), mirrorMoveMap[this.move]);
  }
}

const mirrorMoveMap: { [action in MoveAction]: MoveAction } = {
  [MoveAction.Up]: MoveAction.Down,
  [MoveAction.Down]: MoveAction.Up,
  [MoveAction.Left]: MoveAction.Right,
  [MoveAction.Right]: MoveAction.Left,
};
