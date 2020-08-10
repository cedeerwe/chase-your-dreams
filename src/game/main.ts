import { State } from "../store/state";
import { MoveAction } from "./position";
import { GameLevel } from "./newLevel";

export function mainLogic(state: State, move: MoveAction): State {
  return updateActiveLevel(state, (level) =>
    level.action(move).goalAction(move)
  );
}

export function updateActiveLevel(
  state: State,
  f: (level: GameLevel) => GameLevel
): State {
  return {
    ...state,
    levels: state.levels.map((level, i) =>
      i === state.activeLevel ? f(level) : level
    ),
  };
}
