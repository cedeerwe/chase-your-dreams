import { MoveAction } from "./position";

export type LevelDescription = {
  name: string;
  board: GameBoard;
  thresholds: {
    twoStar: number;
    threeStar: number;
  };
  startingPositions: {
    player: BoardPosition;
    goal: BoardPosition;
  };
};

export type TileMeta = { visited: boolean };

export type LevelData = {
  round: number;
  bestResult: number | undefined;
  active: boolean;
  playerPosition: BoardPosition;
  goalPosition: BoardPosition;
  tileMetaData: Map<number, Map<number, TileMeta>>;
};

export enum BoardTile {
  Empty = "Empty",
  Goal = "Goal",
  Player = "Player",
}

export class GameLevel {
  constructor(public description: LevelDescription, public data: LevelData) {}

  public static new(description: LevelDescription): GameLevel {
    const tileMetaData = new Map();
    for (let x = 0; x < description.board.width; x++) {
      const xMap = new Map();
      tileMetaData.set(x, xMap);
      for (let y = 0; y < description.board.height; y++) {
        xMap.set(y, { visited: false });
      }
    }
    tileMetaData
      .get(description.startingPositions.player.x)
      .set(description.startingPositions.player.y, { visited: true });
    return new GameLevel(description, {
      round: 0,
      bestResult: undefined,
      active: true,
      playerPosition: description.startingPositions.player,
      goalPosition: description.startingPositions.goal,
      tileMetaData,
    });
  }

  public update(data: Partial<LevelData>): GameLevel {
    return new GameLevel(this.description, { ...this.data, ...data });
  }

  public action(action: MoveAction): GameLevel {
    const playerTile = this.description.board.getTile(this.data.playerPosition);
    const result = this.update(
      playerTile.action(this.description.board, this.data, action)
    );
    result.data.tileMetaData
      .get(result.data.playerPosition.x)!
      .set(result.data.playerPosition.y, { visited: true });
    return result;
  }

  public goalAction(action: MoveAction): GameLevel {
    const goalTile = this.description.board.getTile(this.data.goalPosition);
    return this.update(
      goalTile.goalAction(this.description.board, this.data, action)
    )
      .addRound()
      .deactivateIfReachedGoal();
  }

  public addRound(): GameLevel {
    return this.update({ round: this.data.round + 1 });
  }

  public deactivate(): GameLevel {
    return this.update({ active: false });
  }

  public storeBestResult(): GameLevel {
    return this.update({
      bestResult:
        this.data.bestResult === undefined
          ? this.data.round
          : this.data.round < this.data.bestResult
          ? this.data.round
          : this.data.bestResult,
    });
  }

  public deactivateIfReachedGoal(): GameLevel {
    return this.playerReachedGoal()
      ? this.storeBestResult().deactivate()
      : this;
  }

  public playerReachedGoal(): boolean {
    return (
      this.data.playerPosition.x === this.data.goalPosition.x &&
      this.data.playerPosition.y === this.data.goalPosition.y
    );
  }

  public restart(): GameLevel {
    return GameLevel.new(this.description).update({
      bestResult: this.data.bestResult,
    });
  }

  public tile(x: number, y: number): BoardTile {
    if (this.data.playerPosition.x === x && this.data.playerPosition.y === y) {
      return BoardTile.Player;
    } else if (
      this.data.goalPosition.x === x &&
      this.data.goalPosition.y === y
    ) {
      return BoardTile.Goal;
    } else {
      return BoardTile.Empty;
    }
  }

  public tableIterator(): Array<Array<BoardTile>> {
    return Array.from(Array(this.description.board.height), (_, y) =>
      Array.from(Array(this.description.board.width), (_, x) =>
        this.tile(x, this.description.board.width - 1 - y)
      )
    );
  }
}

abstract class Tile {
  private name: string;
  constructor() {
    this.name = this.constructor.name;
  }
  public abstract action(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData;

  public goalAction(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    return data;
  }
}

export class NoRuleTile extends Tile {
  public action(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    return {
      ...data,
      playerPosition: normalMove(
        data.playerPosition,
        action,
        board.width,
        board.height
      ),
    };
  }
}

export class NoRuleGoalCopyTile extends NoRuleTile {
  public goalAction(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    const goalTile = board.getTile(data.goalPosition);
    const goalData = { ...data, playerPosition: data.goalPosition }; // HACK
    const goalResult = goalTile.action(board, goalData, action); // HACK
    const goalPosition = goalResult.playerPosition; // HACK
    return { ...data, goalPosition };
  }
}

export class NoRuleGoalMirrorTile extends NoRuleTile {
  public goalAction(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    const goalTile = board.getTile(data.goalPosition);
    const goalData = { ...data, playerPosition: data.goalPosition }; // HACK
    const goalResult = goalTile.action(board, goalData, mirrorAction(action)); // HACK
    const goalPosition = goalResult.playerPosition; // HACK
    return { ...data, goalPosition };
  }
}

export class WallTile extends Tile {
  private allowed: { [action in MoveAction]: boolean };
  constructor(walls: MoveAction[]) {
    super();
    const allowed = {
      [MoveAction.Up]: true,
      [MoveAction.Down]: true,
      [MoveAction.Left]: true,
      [MoveAction.Right]: true,
    };
    for (const wall of walls) {
      allowed[wall] = false;
    }
    this.allowed = allowed;
  }

  public action(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    if (this.allowed[action]) {
      return new NoRuleTile().action(board, data, action);
    } else {
      return data;
    }
  }
}

export class WallTileGoalCopy extends WallTile {
  public goalAction(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    const goalTile = board.getTile(data.goalPosition);
    const goalData = { ...data, playerPosition: data.goalPosition }; // HACK
    const goalResult = goalTile.action(board, goalData, action); // HACK
    const goalPosition = goalResult.playerPosition; // HACK
    return { ...data, goalPosition };
  }
}

export class WallTileGoalMirror extends WallTile {
  public goalAction(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    const goalTile = board.getTile(data.goalPosition);
    const goalData = { ...data, playerPosition: data.goalPosition }; // HACK
    const goalResult = goalTile.action(board, goalData, mirrorAction(action)); // HACK
    const goalPosition = goalResult.playerPosition; // HACK
    return { ...data, goalPosition };
  }
}

export class WallTileCondition extends Tile {
  constructor(
    private walls: {
      [action in MoveAction]?:
        | { variant: "visit"; x: number; y: number }
        | { variant: "always" }
        | { variant: "round"; threshold: number };
    }
  ) {
    super();
  }

  public action(
    board: GameBoard,
    data: LevelData,
    action: MoveAction
  ): LevelData {
    const wall = this.walls[action];
    if (wall === undefined) {
      return new NoRuleTile().action(board, data, action);
    }
    if (wall.variant === "always") {
      return data;
    } else if (wall.variant === "visit") {
      if (data.tileMetaData.get(wall.x)?.get(wall.y)!.visited) {
        return new NoRuleTile().action(board, data, action);
      } else {
        return data;
      }
    } else {
      if (data.round >= wall.threshold) {
        return new NoRuleTile().action(board, data, action);
      } else {
        return data;
      }
    }
  }
}

type BoardPosition = { x: number; y: number };

function modulate(x: number, mod: number): number {
  while (x < 0) {
    x += mod;
  }
  while (x >= mod) {
    x -= mod;
  }
  return x;
}

export class GameBoard {
  constructor(
    public width: number,
    public height: number,
    private tiles: Map<number, Map<number, Tile>>
  ) {}

  public static newAllNoRule(width: number, height: number): GameBoard {
    const tiles: Map<number, Map<number, Tile>> = new Map();
    for (let x = 0; x < width; x++) {
      const xMap = new Map();
      tiles.set(x, xMap);
      for (let y = 0; y < height; y++) {
        xMap.set(y, new NoRuleTile());
      }
    }
    return new GameBoard(width, height, tiles);
  }

  public static newAllNoRuleGoalCopy(width: number, height: number): GameBoard {
    const tiles: Map<number, Map<number, Tile>> = new Map();
    for (let x = 0; x < width; x++) {
      const xMap = new Map();
      tiles.set(x, xMap);
      for (let y = 0; y < height; y++) {
        xMap.set(y, new NoRuleGoalCopyTile());
      }
    }
    return new GameBoard(width, height, tiles);
  }

  public static newAllNoRuleGoalMirror(
    width: number,
    height: number
  ): GameBoard {
    const tiles: Map<number, Map<number, Tile>> = new Map();
    for (let x = 0; x < width; x++) {
      const xMap = new Map();
      tiles.set(x, xMap);
      for (let y = 0; y < height; y++) {
        xMap.set(y, new NoRuleGoalMirrorTile());
      }
    }
    return new GameBoard(width, height, tiles);
  }

  public update(position: BoardPosition, tile: Tile): GameBoard {
    const mapX = this.tiles.get(position.x)!;
    mapX.set(position.y, tile);
    return this;
  }

  public getTile(position: BoardPosition): Tile {
    const tile = this.tiles.get(position.x)?.get(position.y);
    if (tile === undefined) {
      throw Error(
        `Unable to find tile for the input player position ${position}`
      );
    }
    return tile;
  }
}

function normalMove(
  position: BoardPosition,
  action: MoveAction,
  width: number,
  height: number
): BoardPosition {
  switch (action) {
    case MoveAction.Up:
      return { x: position.x, y: modulate(position.y + 1, height) };
    case MoveAction.Down:
      return { x: position.x, y: modulate(position.y - 1, height) };
    case MoveAction.Left:
      return { x: modulate(position.x - 1, width), y: position.y };
    case MoveAction.Right:
      return { x: modulate(position.x + 1, width), y: position.y };
  }
}

function mirrorAction(action: MoveAction): MoveAction {
  switch (action) {
    case MoveAction.Up:
      return MoveAction.Down;
    case MoveAction.Down:
      return MoveAction.Up;
    case MoveAction.Left:
      return MoveAction.Right;
    case MoveAction.Right:
      return MoveAction.Left;
  }
}
