import { roundToTwoDecimals } from "utils/math";
import { getKeyLabel, hasLongKeyLabel } from "utils/keyboard";
import styles from "./table.module.scss";

const Table = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const TableRow = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

const TableItem = ({ value, label, unit = null, stretch = false, disabled = false, showBuilding = false }) => {
  const _value = roundToTwoDecimals(value);

  return (
    <div
      className={`
			${styles.item} 
			${showBuilding ? styles.building : null} 
			${disabled ? styles.disabled : null}`}
    >
      {/* Conditionally show building icon, used rn to show fastest and slowest building stats */}
      <div className={styles.icon}>
        {showBuilding && (
          <>
            <img src={showBuilding.icon} alt={`${showBuilding.name} icon`} />
            <div className={styles.keys}>
              {showBuilding.shortcuts.map((key, i) => (
                <span className={hasLongKeyLabel(key) ? styles.longLabel : null} key={i}>
                  {getKeyLabel(key)}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div>
        <h2>
          {_value}
          {unit && <span className={styles.unit}>{unit}</span>}
        </h2>
        <span>{label}</span>
      </div>
    </div>
  );
};

export { Table, TableRow, TableItem };
