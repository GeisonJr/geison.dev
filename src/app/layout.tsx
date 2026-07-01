import { Theme } from '@/components'
import { baseUrl } from '@/helpers'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	metadataBase: baseUrl,
	title: 'Geison Oriani',
	description: 'Software Engineer'
}

export const viewport: Viewport = {
	colorScheme: 'dark'
}

const inter = Inter({
	subsets: ['latin']
})

export default function Layout({ children }: React.PropsWithChildren) {

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
