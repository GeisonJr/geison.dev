import { Skeleton as RadixSkeleton } from '@radix-ui/themes'
import type { SkeletonProps } from './types'

function Skeleton(props: SkeletonProps) {

	return (
		<RadixSkeleton {...props} />
	)
}

Skeleton.displayName = 'Skeleton'

export {
	Skeleton
}

