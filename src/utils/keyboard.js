/**
 * Checks if customLayout matches any of the provided default layouts.
 */
const deriveKeyboardLayout = (defaultLayouts, customLayout) => {
	if (!defaultLayouts) return null
	return Object.keys(defaultLayouts).find(
		(key) =>
			JSON.stringify(defaultLayouts[key]) === JSON.stringify(customLayout)
	)
}

const normalizeKey = (key) => {
	if (!key) return key

	return key.length === 1 ? key.toLowerCase() : key
}

const getKeyLabel = (key) => {
	if (key === ' ') return 'Spacebar'
	if (key === 'CapsLock') return 'Caps Lock'
	if (key?.length === 1) return key.toUpperCase()

	return key
}

const hasLongKeyLabel = (key) => getKeyLabel(key)?.length > 1

export { deriveKeyboardLayout, getKeyLabel, hasLongKeyLabel, normalizeKey }
