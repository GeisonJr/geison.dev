import { Flex as RadixFlex } from '@radix-ui/themes'
import type { FlexProps } from './types'

function Flex(props: FlexProps) {

	return (
		<RadixFlex {...props} />
	)
}

Flex.displayName = 'Flex'

export {
	Flex
}

