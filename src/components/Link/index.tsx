import { Link as RadixLink } from '@radix-ui/themes'
import NextLink from 'next/link'
import type { LinkProps } from './types'

function Link({ children, href, ...rest }: LinkProps) {

	return (
		<RadixLink
			asChild
			{...rest}
		>
			<NextLink
				href={href ?? ''}
			>
				{children}
			</NextLink>
		</RadixLink>
	)
}

Link.displayName = 'Link'

export {
	Link
}

