export interface DiscordChannel {
	id: string
	name: string
	position: number
}

export interface DiscordMemberActivity {
	name: string
}

export interface DiscordMember {
	id: string
	username: string
	discriminator: string
	avatar: null
	status: string
	avatar_url: string
	activity?: DiscordMemberActivity
}

export interface DiscordWidget {
	id: string
	name: string
	presence_count: number
	instant_invite: string
	channels: DiscordChannel[]
	members: DiscordMember[]
}

export interface Member {
	id: string
	avatar: string
	activity: string
	status: string
	color: string
}

export interface Widget {
	id: string
	name: string
	invite_url: string
	presence_count: number
	presence_members: Member[]
}
