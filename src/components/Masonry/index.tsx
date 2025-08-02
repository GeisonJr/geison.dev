'use client'

import { Grid as RadixGrid } from '@radix-ui/themes'
import type { MansoryProps } from './types'

function Masonry(props: MansoryProps) {

	return (
		<RadixGrid
			flexBasis={'100%'}
			{...props}
			style={{
				...props.style,
				gridTemplateColumns: `repeat(auto-fill, minmax(${props.minWidth}, 1fr))`,
				gridTemplateRows: 'masonry'
			}}
		/>
	)
}


Masonry.displayName = 'Masonry'

export {
	Masonry
}

