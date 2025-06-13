'use client'

import { useEffect, useState } from 'react'
import type { LocaleLanguage } from './types'

function useLocale() {
	const [language, setLanguage] = useState<LocaleLanguage>()

	useEffect(() => {
		if (navigator?.language) {
			setLanguage(navigator.language)
		}
	}, [])

	return {
		language
	}
}

export {
	useLocale
}

