export interface WakatimeCategory {
	name: string
	total_seconds: number
	percent: number
	digital: string
	decimal: string
	text: string
	hours: number
	minutes: number
}

export interface WakatimeOperatingSystem {
	name: string
	total_seconds: number
	percent: number
	digital: string
	decimal: string
	text: string
	hours: number
	minutes: number
}

export interface WakatimeLanguage {
	name: string
	total_seconds: number
	percent: number
	digital: string
	decimal: string
	text: string
	hours: number
	minutes: number
}

export interface WakatimeEditor {
	name: string
	total_seconds: number
	percent: number
	digital: string
	decimal: string
	text: string
	hours: number
	minutes: number
}

export interface WakatimeData {
	data: {
		id: string
		user_id: string
		range: string
		timeout: number
		writes_only: boolean
		holidays: number
		status: string
		human_readable_total_including_other_language: string
		days_minus_holidays: number
		total_seconds_including_other_language: number
		categories: WakatimeCategory[]
		human_readable_total: string
		days_including_holidays: number
		operating_systems: WakatimeOperatingSystem[]
		total_seconds: number
		daily_average_including_other_language: number
		daily_average: number
		percent_calculated: number
		human_readable_daily_average: string
		languages: WakatimeLanguage[]
		is_up_to_date: boolean
		human_readable_daily_average_including_other_language: string
		is_already_updating: boolean
		is_stuck: boolean
		editors: WakatimeEditor[]
		is_up_to_date_pending_future: boolean
		is_cached: boolean
		username: string
		is_including_today: boolean
		human_readable_range: string
		is_coding_activity_visible: boolean
		is_language_usage_visible: boolean
		is_editor_usage_visible: boolean
		is_category_usage_visible: boolean
		is_os_usage_visible: boolean
	}
}

export interface Language {
	name: string
	percent: number
	text: string
}

export interface Data {
	profile_name: string
	profile_url: string
	daily_average: string
	total: string
	range: string
	languages: Language[]
}
