import { createAction } from "typesafe-actions";

// ACTIONS
export const ARROW_UP = "ARROW_UP";
export const ARROW_DOWN = "ARROW_DOWN";
export const ARROW_RIGHT = "ARROW_RIGHT";
export const ARROW_LEFT = "ARROW_LEFT";

export const arrowUp = createAction(ARROW_UP)();
export const arrowDown = createAction(ARROW_DOWN)();
export const arrowLeft = createAction(ARROW_LEFT)();
export const arrowRight = createAction(ARROW_RIGHT)();
