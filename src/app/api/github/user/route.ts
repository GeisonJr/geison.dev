import { github } from '@/helpers'
import { NextResponse } from 'next/server'
import { GitHubUser, User } from './types'

export async function GET() {

	const data = await github().get<GitHubUser>('user')

	const response: User = {
		id: data.id,
		avatarUrl: data.avatar_url,
		name: data.login,
		url: data.html_url,
		followers: data.followers
	}

	return NextResponse.json(response)
}
