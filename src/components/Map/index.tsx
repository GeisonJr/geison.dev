import React from 'react'
import type { MapProps } from './types'

function Map<T>({ data, children }: MapProps<T>) {

	return data?.map?.((item, index) => (
		React.cloneElement(children(item, index), {
			key: index
		})
	))
}

Map.displayName = 'Map'

export { Map }

