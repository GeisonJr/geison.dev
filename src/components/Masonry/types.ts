import type { GridProps as ReactGridProps } from '@radix-ui/themes'

type Props = ReactGridProps & {
	readonly minWidth: string | number
}

export type {
	Props as MansoryProps
}

