import { Card as RadixCard } from '@radix-ui/themes'
import type { CardProps } from './types'

function Card(props: CardProps) {

	return (
		<RadixCard {...props} />
	)
}

Card.displayName = 'Card'

export {
	Card
}

