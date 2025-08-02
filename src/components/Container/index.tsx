import { Container as RadixContainer } from '@radix-ui/themes'
import type { ContainerProps } from './types'

function Container(props: ContainerProps) {

	return (
		<RadixContainer {...props} />
	)
}

Container.displayName = 'Container'

export {
	Container
}

