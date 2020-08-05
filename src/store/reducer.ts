import { ActionType, createReducer, Reducer } from "typesafe-actions";
import * as actions from "./actions";
import { State, initialState } from "./state";
import { mainLogic } from "../game/main";
import { MoveAction } from "../game/position";

export type RootAction = ActionType<typeof actions>;

export const reducer: Reducer<State, RootAction> = createReducer<
  State,
  RootAction
>(initialState)
  .handleAction(actions.arrowUp, (state) => mainLogic(state, MoveAction.Up))
  .handleAction(actions.arrowDown, (state) => mainLogic(state, MoveAction.Down))
  .handleAction(actions.arrowLeft, (state) => mainLogic(state, MoveAction.Left))
  .handleAction(actions.arrowRight, (state) =>
    mainLogic(state, MoveAction.Right)
  );
