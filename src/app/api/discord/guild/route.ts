import { discord, env } from '@/helpers/api/server'
import { NextResponse } from 'next/server'
import type { DiscordGuild, Guild } from './types'

export async function GET() {
	try {
		const guildId = env('DISCORD_GUILD_ID')

		const data = await discord().get<DiscordGuild>(`guilds/${guildId}`, {
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
	} catch {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
