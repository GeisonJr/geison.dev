import { env, github } from '@/helpers/api/server'
import { NextResponse } from 'next/server'
import { GitHubUser, User } from './types'

export async function GET() {
	try {
		const username = env('GITHUB_USERNAME')
		const data = await github().get<GitHubUser>(`users/${username}`)

		const response: User = {
			id: data.id,
			avatarUrl: data.avatar_url,
			name: data.login,
			url: data.html_url,
			followers: data.followers
		}

		return NextResponse.json(response)
	} catch {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
