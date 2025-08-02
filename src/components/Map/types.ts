type Props<T> = {
	readonly data: T[]
	readonly children: (item: T, index: number) => React.ReactElement
}

export type {
	Props as MapProps
}

