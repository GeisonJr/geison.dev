import { Badge as RadixBadge } from '@radix-ui/themes'
import type { BadgeProps } from './types'

function Badge(props: BadgeProps) {

	return (
		<RadixBadge {...props} />
	)
}

Badge.displayName = 'Badge'

export {
	Badge
}

