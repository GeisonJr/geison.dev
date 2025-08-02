'use client'

import { useTheme } from '@/hooks'
import '@/styles/globals.css'
import { Theme as RadixTheme, ThemePanel as RadixThemePanel } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { If } from '../If'
import type { ThemeProps } from './types'

function Theme({ children }: ThemeProps) {

	const theme = useTheme()

	if (theme.scheme === null) {
		return null
	}

	return (
		<RadixTheme
			accentColor={'green'}
			appearance={theme.scheme}
			grayColor={'auto'}
		>
			<If condition={process.env.NODE_ENV === 'development'}>
				<RadixThemePanel
					defaultOpen={false}
				/>
			</If>
			{children}
		</RadixTheme>
	)
}

Theme.displayName = 'Theme'

export {
	Theme
}

