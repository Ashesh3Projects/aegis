/**
 * @file  TODO: Remove state from component and pass down as prop.
 */

import useStore from "store";
import { useGameState } from "hooks";
import { getKeyLabel, hasLongKeyLabel } from "utils/keyboard";
import styles from "./keys.module.scss";

const Keys = () => {
  const { keyPressed, score, gameState, showLabeledKeys } = useStore((state) => ({
    keyPressed: state.keyPressed,
    score: state.score,
    gameState: state.gameState,
    showLabeledKeys: state.showLabeledKeys,
  }));
  const { firstKey, secondKey, playerKeyIncorrect } = useGameState();
  const shortcuts = [firstKey, secondKey];
  const keyLabels = showLabeledKeys === "SHOW" ? styles.labeled : showLabeledKeys === "FADE_IN" ? "fade-in" : null;

  return (
    <div className={`${styles.keys} ${playerKeyIncorrect ? "shake" : null}`}>
      {shortcuts.map((key, i) => (
        <div
          className={`
                      ${styles.key} ${gameState[0] >= i + 1 ? styles.correct : null} 
                      ${hasLongKeyLabel(key) ? styles.longLabel : null}
                      ${keyLabels}
                      ${keyPressed && parseInt(gameState[0]) === i + 1 ? styles.down : null}`}
          key={i + score.toFixed()}
        >
          {getKeyLabel(key)}
        </div>
      ))}
    </div>
  );
};

export default Keys;
