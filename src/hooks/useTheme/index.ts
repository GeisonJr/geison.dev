'use client'

import { useCallback, useEffect, useState } from 'react'
import type { ThemeScheme } from './types'

function useTheme() {
	const [scheme, setScheme] = useState<ThemeScheme>(null)

	const handleChange = useCallback((event: MediaQueryListEvent) => {
		setScheme(event.matches ? 'dark' : 'light')
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined' && window.matchMedia) {
			const media = window.matchMedia('(prefers-color-scheme: dark)')

			setScheme(media.matches ? 'dark' : 'light')
			media.addEventListener('change', handleChange)

			return () => {
				media.removeEventListener('change', handleChange)
			}
		}
	}, [handleChange])

	return {
		scheme
	}
}

export {
	useTheme
}

