/**
 * @file Hook to handle keydown events
 */
import { useState, useEffect } from 'react'
import { normalizeKey } from 'utils/keyboard'

const ALLOWED_NAMED_KEYS = ['CapsLock', 'Escape']

const useKeyPress = (callback) => {
	const [keyPressed, setKeyPressed] = useState()

	useEffect(() => {
		const handleKeyDown = ({ key }) => {
			const normalizedKey = normalizeKey(key)
			const isAllowedKey = key.length === 1 || ALLOWED_NAMED_KEYS.includes(key)

			if (keyPressed !== normalizedKey && isAllowedKey) {
				setKeyPressed(normalizedKey)
				callback && callback(normalizedKey)
			}
		}
		const handleKeyUp = () => {
			setKeyPressed(null)
		}
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	})
	return keyPressed
}

export default useKeyPress
