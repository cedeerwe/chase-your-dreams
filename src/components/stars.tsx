import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { LevelDescription } from "../game/newLevel";

type Props = {
  bestResult: number | undefined;
  thresholds: LevelDescription["thresholds"];
};

export const Stars: React.FC<Props> = ({ bestResult, thresholds }) => {
  const stars =
    bestResult === undefined ? (
      <div>
        <FontAwesomeIcon icon={faStar} size={"2x"} />
        <FontAwesomeIcon icon={faStar} size={"2x"} />
        <FontAwesomeIcon icon={faStar} size={"2x"} />
      </div>
    ) : bestResult <= thresholds.threeStar ? (
      <div>
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
      </div>
    ) : bestResult <= thresholds.twoStar ? (
      <div>
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
        <FontAwesomeIcon icon={faStar} size={"2x"} />
      </div>
    ) : (
      <div>
        <FontAwesomeIcon icon={faStar} size={"2x"} color="red" />
        <FontAwesomeIcon icon={faStar} size={"2x"} />
        <FontAwesomeIcon icon={faStar} size={"2x"} />
      </div>
    );
  return stars;
};
