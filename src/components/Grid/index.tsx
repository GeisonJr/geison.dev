import { Grid as RadixGrid } from '@radix-ui/themes'
import type { GridProps } from './types'

function Grid(props: GridProps) {

	return (
		<RadixGrid {...props} />
	)
}

Grid.displayName = 'Grid'

export {
	Grid
}

