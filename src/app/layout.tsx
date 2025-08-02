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

type Props = React.PropsWithChildren<{
	readonly discord: React.ReactNode
	readonly github: React.ReactNode
	readonly gravatar: React.ReactNode
	readonly wakatime: React.ReactNode
}>

const inter = Inter({
	subsets: ['latin']
})

export default function Layout({ children, discord, gravatar, github, wakatime }: Props) {

	return (
		<html lang={'en-US'}>
			<body className={inter.className}>
				<Theme>
					{children}
					{gravatar}
					{github}
					{wakatime}
					{discord}
				</Theme>
			</body>
		</html>
	)
}
