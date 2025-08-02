import { Text as RadixText } from '@radix-ui/themes'
import type { TextProps } from './types'

function Text({ ...props }: TextProps) {

	return (
		<RadixText {...props} />
	)
}

Text.displayName = 'Text'

export {
	Text
}

