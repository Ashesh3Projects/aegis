/**
 * @file Hook to handle keydown events
 */
import { useState, useEffect, useRef } from 'react'
import { normalizeKey } from 'utils/keyboard'

const ALLOWED_NAMED_KEYS = ['CapsLock', 'Escape']

const useKeyPress = (callback) => {
	const [keyPressed, setKeyPressed] = useState()
	const callbackRef = useRef(callback)
	const keyPressedRef = useRef()

	callbackRef.current = callback

	useEffect(() => {
		const handleKeyDown = (event) => {
			const { key } = event
			const normalizedKey = normalizeKey(key)
			const isAllowedKey = key.length === 1 || ALLOWED_NAMED_KEYS.includes(key)

			if (keyPressedRef.current !== normalizedKey && isAllowedKey) {
				keyPressedRef.current = normalizedKey
				setKeyPressed(normalizedKey)
				callbackRef.current && callbackRef.current(normalizedKey, event)
			}
		}
		const handleKeyUp = () => {
			keyPressedRef.current = null
			setKeyPressed(null)
		}
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])
	return keyPressed
}

export default useKeyPress
