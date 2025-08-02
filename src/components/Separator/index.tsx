import { Separator as RadixSeparator } from '@radix-ui/themes'
import { Box } from '../Box'
import type { SeparatorProps } from './types'

function Separator(props: SeparatorProps) {

	return (
		<Box>
			<RadixSeparator {...props} />
		</Box>
	)
}

Separator.displayName = 'Separator'

export {
	Separator
}

