export interface Attribute {
	label: string
	color: string
}

export interface MeData {
	name: string
	avatar_url: string
	description: string
	birth_date: string
	strengths: Attribute[]
	interests: Attribute[]
	weaknesses: Attribute[]
}

export interface Me {
	name: string
	age: string
	avatar_url: string
	description: string
	strengths: Attribute[]
	interests: Attribute[]
	weaknesses: Attribute[]
}
