import { ActionType, createReducer, Reducer } from "typesafe-actions";
import * as actions from "./actions";
import { State, initialState } from "./state";
import { mainLogic, updateActiveLevel } from "../game/main";
import { MoveAction } from "../game/position";
import { View } from "./types";

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
  )
  .handleAction(actions.toLevel, (state) => ({
    ...state,
    view: View.Level,
  }))
  .handleAction(actions.toSpecificLevel, (state, action) => ({
    ...state,
    view: View.Level,
    activeLevel: action.payload,
  }))
  .handleAction(actions.toSummary, (state) => ({
    ...state,
    view: View.Summary,
  }))
  .handleAction(actions.restartLevel, (state) =>
    updateActiveLevel(state, (level) => level.restart())
  );
