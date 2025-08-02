export interface DiscordGuild {
	id: string
	name: string
	icon: string
	description: string
	home_header: null
	splash: string
	discovery_splash: null
	features: string[]
	banner: null
	owner_id: string
	application_id: null
	region: string
	afk_channel_id: string
	afk_timeout: number
	system_channel_id: string
	system_channel_flags: number
	widget_enabled: boolean
	widget_channel_id: string
	verification_level: number
	roles: {
		id: string
		name: string
		description: null
		permissions: string
		position: number
		color: number
		colors: {
			primary_color: number
			secondary_color: null
			tertiary_color: null
		}
		hoist: boolean
		managed: boolean
		mentionable: boolean
		icon: null
		unicode_emoji: null
		flags: number
	}[]
	default_message_notifications: number
	mfa_level: number
	explicit_content_filter: number
	max_presences: null
	max_members: number
	max_stage_video_channel_users: number
	max_video_channel_users: number
	vanity_url_code: null
	premium_tier: number
	premium_subscription_count: number
	preferred_locale: string
	rules_channel_id: string
	safety_alerts_channel_id: string
	public_updates_channel_id: string
	hub_type: null
	premium_progress_bar_enabled: boolean
	latest_onboarding_question_id: string
	nsfw: boolean
	nsfw_level: number
	emojis: {
		id: string
		name: string
		roles: []
		require_colons: boolean
		managed: boolean
		animated: boolean
		available: boolean
	}[]
	stickers: []
	incidents_data: null
	inventory_settings: null
	embed_enabled: boolean
	embed_channel_id: string
	approximate_member_count: number
	approximate_presence_count: number
}

export interface Guild {
	description: string
	approximate_member_count: number
	approximate_presence_count: number
}
