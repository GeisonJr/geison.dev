import { Box as RadixBox } from '@radix-ui/themes'
import type { BoxProps } from './types'

function Box(props: BoxProps) {

	return (
		<RadixBox {...props} />
	)
}

Box.displayName = 'Box'

export {
	Box
}

