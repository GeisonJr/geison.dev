type Props = React.PropsWithChildren<{
	readonly discord: React.ReactNode
	readonly github: React.ReactNode
	readonly gravatar: React.ReactNode
	readonly wakatime: React.ReactNode
}>

export default function Layout({ children, discord, gravatar, github, wakatime }: Props) {

	return (
		<>
			{children}
			{gravatar}
			{github}
			{wakatime}
			{discord}
		</>
	)
}
