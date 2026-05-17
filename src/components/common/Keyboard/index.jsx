import styles from './keyboard.module.scss'
import { getKeyLabel } from 'utils/keyboard'

const Keyboard = ({
	keyboardLayout = [
		['q', 'w', 'e', 'r'],
		['a', 's', 'd', 'f'],
		['z', 'x', 'c', 'v']
	]
}) => {
	const isArray = Array.isArray(keyboardLayout)

	return isArray ? (
		<div className={styles.keyboard}>
			{keyboardLayout.map((row, i) => (
				<div className={styles.row} key={i}>
					{row.map((el, j) => (
						<div className={styles.key} key={j}>
							{getKeyLabel(el)}
						</div>
					))}
				</div>
			))}
		</div>
	) : null
}

export default Keyboard
