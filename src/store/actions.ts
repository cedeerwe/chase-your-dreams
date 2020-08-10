import { createAction } from "typesafe-actions";

// ACTIONS
export const ARROW_UP = "ARROW_UP";
export const ARROW_DOWN = "ARROW_DOWN";
export const ARROW_RIGHT = "ARROW_RIGHT";
export const ARROW_LEFT = "ARROW_LEFT";
export const RESTART_LEVEL = "RESTART_LEVEL";
export const TO_LEVEL = "TO_LEVEL";
export const TO_SUMMARY = "TO_SUMMARY";
export const TO_SPECIFIC_LEVEL = "TO_SPECIFIC_LEVEL";

export const arrowUp = createAction(ARROW_UP)();
export const arrowDown = createAction(ARROW_DOWN)();
export const arrowLeft = createAction(ARROW_LEFT)();
export const arrowRight = createAction(ARROW_RIGHT)();
export const restartLevel = createAction(RESTART_LEVEL)();
export const toLevel = createAction(TO_LEVEL)();
export const toSummary = createAction(TO_SUMMARY)();
export const toSpecificLevel = createAction(TO_SPECIFIC_LEVEL)<number>();
