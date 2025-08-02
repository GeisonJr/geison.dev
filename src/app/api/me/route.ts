import { NextResponse } from 'next/server'
import mock from './data.json'
import type { Me, MeData } from './types'

export async function GET() {

	const response = mock as MeData

	const birthDate = new Date(response.birth_date)
	const today = new Date()
	let age = (today.getFullYear() - birthDate.getFullYear()).toString()

	if (age === '24') {
		age = '23 + 1'
	}

	const data: Me = {
		name: response.name,
		avatar_url: response.avatar_url,
		description: response.description,
		age,
		strengths: response.strengths,
		interests: response.interests,
		weaknesses: response.weaknesses,
	}

	return NextResponse.json(data)
}
