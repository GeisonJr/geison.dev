import { discord } from '@/helpers'
import { NextResponse } from 'next/server'
import type { DiscordGuild, Guild } from './types'

export async function GET() {

	const data = await discord().get<DiscordGuild>('guilds/585298560262864896', {
		query: {
			with_counts: 'true'
		}
	})

	const response: Guild = {
		description: data.description,
		approximate_member_count: data.approximate_member_count,
		approximate_presence_count: data.approximate_presence_count
	}

	return NextResponse.json(response)
}
