import { BoardPosition } from "./position";

export enum BoardTile {
  Empty = "Empty",
  Goal = "Goal",
  Player = "Player",
}

export class PlayerBoard {
  constructor(
    public width: number,
    public height: number,
    public player: BoardPosition,
    public goal: BoardPosition
  ) {}

  private isOnBoardX(x: number): boolean {
    return x >= 0 && x < this.width;
  }

  private isOnBoardY(y: number): boolean {
    return y >= 0 && y < this.height;
  }

  private isOnBoard(x: number, y: number): boolean {
    return this.isOnBoardX(x) && this.isOnBoardY(y);
  }

  private logCoordinatesNotMatchingBoard(x: number, y: number) {
    console.log(
      `Field with coordinates [${x}, ${y}] does not appear on board with size ${this.width}x${this.height}`
    );
  }

  public move(player: BoardPosition, goal: BoardPosition): PlayerBoard {
    if (this.isOnBoard(player.x, player.y)) {
      if (this.isOnBoard(goal.x, goal.y)) {
        return new PlayerBoard(this.width, this.height, player, goal);
      } else {
        this.logCoordinatesNotMatchingBoard(goal.x, goal.y);
        return this;
      }
    } else {
      this.logCoordinatesNotMatchingBoard(player.x, player.y);
      return this;
    }
  }

  public movePlayer(player: BoardPosition): PlayerBoard {
    return this.move(player, this.goal);
  }

  public moveGoal(goal: BoardPosition): PlayerBoard {
    return this.move(this.player, goal);
  }

  public tile(x: number, y: number): BoardTile {
    if (this.player.x === x && this.player.y === y) {
      return BoardTile.Player;
    } else if (this.goal.x === x && this.goal.y === y) {
      return BoardTile.Goal;
    } else {
      return BoardTile.Empty;
    }
  }

  public tableIterator(): Array<Array<BoardTile>> {
    return Array.from(Array(this.height), (_, y) =>
      Array.from(Array(this.width), (_, x) => this.tile(x, this.width - 1 - y))
    );
  }
}
