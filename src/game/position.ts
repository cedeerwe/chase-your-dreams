export enum MoveAction {
  Up,
  Down,
  Left,
  Right,
}

export class BoardPosition {
  constructor(public x: number, public y: number) {}

  public move(move: MoveAction): BoardPosition {
    switch (move) {
      case MoveAction.Up:
        return new BoardPosition(this.x, this.y + 1);
      case MoveAction.Down:
        return new BoardPosition(this.x, this.y - 1);
      case MoveAction.Left:
        return new BoardPosition(this.x - 1, this.y);
      case MoveAction.Right:
        return new BoardPosition(this.x + 1, this.y);
    }
  }

  public modulateX(columns: number): BoardPosition {
    return new BoardPosition(modulate(this.x, columns), this.y);
  }

  public modulateY(rows: number): BoardPosition {
    return new BoardPosition(this.x, modulate(this.y, rows));
  }

  public modulate(rows: number, columns: number): BoardPosition {
    return this.modulateX(columns).modulateY(rows);
  }
}

function modulate(x: number, mod: number): number {
  while (x < 0) {
    x += mod;
  }
  while (x >= mod) {
    x -= mod;
  }
  return x;
}
