import { discord } from '@/helpers'
import { NextResponse } from 'next/server'
import type { DiscordWidget, Member, Widget } from './types'

export async function GET() {

	const data = await discord().get<DiscordWidget>('guilds/585298560262864896/widget.json')

	const presenceMembers: Member[] = []
	for (const member of data.members) {
		presenceMembers.push({
			id: member.id,
			avatar: member.avatar_url,
			status: {
				online: 'Online',
				idle: 'Idle',
				dnd: 'Do Not Disturb',
			}[member.status] ?? 'Unknown',
			color: {
				online: 'green',
				idle: 'yellow',
				dnd: 'red',
			}[member.status] ?? 'gray',
			activity: member.activity?.name ?? ''
		})
	}

	const response: Widget = {
		id: data.id,
		name: data.name,
		presence_count: data.presence_count,
		invite_url: data.instant_invite,
		presence_members: presenceMembers
	}

	return NextResponse.json(response)
}
