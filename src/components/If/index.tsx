import type { IfProps } from './types'

function If({ children, condition }: IfProps) {

	if (!condition) {
		return null
	}

	return children
}

If.displayName = 'If'

export {
	If
}

