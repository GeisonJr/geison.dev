import { Theme } from '@/components'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Geison Oriani',
	description: 'Software Engineer'
}

export const viewport: Viewport = {
	colorScheme: 'dark'
}

type Props = React.PropsWithChildren

const inter = Inter({
	subsets: ['latin']
})

export default function Layout({ children }: Props) {

	return (
		<html lang={'en-US'}>
			<body className={inter.className}>
				<Theme>
					{children}
				</Theme>
			</body>
		</html>
	)
}
