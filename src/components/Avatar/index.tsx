import { Avatar as RadixAvatar } from '@radix-ui/themes'
import type { AvatarProps } from './types'

function Avatar(props: AvatarProps) {

	return (
		<RadixAvatar {...props} />
	)
}

Avatar.displayName = 'Avatar'

export {
	Avatar
}

