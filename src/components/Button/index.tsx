import { Button as RadixButton } from '@radix-ui/themes'
import type { ButtonProps } from './types'

function Button({ ...props }: ButtonProps) {

	return (
		<RadixButton {...props} />
	)
}

Button.displayName = 'Button'

export {
	Button
}

