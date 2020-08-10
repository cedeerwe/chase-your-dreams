import { level1 } from "../game/levels/01";
import { level2 } from "../game/levels/02";
import { level3 } from "../game/levels/03";
import { level4 } from "../game/levels/04";
import { level5 } from "../game/levels/05";
import { GameLevel } from "../game/newLevel";
import { View } from "./types";
import { level6 } from "../game/levels/06";
import { level7 } from "../game/levels/07";

export type State = {
  levels: GameLevel[];
  activeLevel: number;
  view: View;
};

export const initialState: State = {
  levels: [level1, level2, level3, level4, level5, level6, level7],
  activeLevel: 0,
  view: View.Intro,
};
