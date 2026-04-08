import 'server-only'

import { API } from './index'

function env(name: string): string {
	const value = process.env[name]?.trim()
	if (!value) {
		throw new Error(`The env "${name}" is not set`)
	}

	return value
}

function envList(name: string): string[] {
	return env(name)
		.split(',')
		.map(value => value.trim())
		.filter(Boolean)
}

function discord() {
	const API_URL = 'https://discord.com/api/v10/'
	const API_KEY = env('DISCORD_API_KEY')

	return new API(API_URL, {
		headers: {
			'Authorization': `Bot ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

function github() {
	const API_URL = 'https://api.github.com/'
	const API_KEY = env('GITHUB_API_KEY')

	return new API(API_URL, {
		headers: {
			'Authorization': `Bearer ${API_KEY}`
		}
	})
}

function gravatar() {
	const API_URL = 'https://api.gravatar.com/v3/'
	const API_KEY = env('GRAVATAR_API_KEY')

	return new API(API_URL, {
		headers: {
			'Authorization': `Bearer ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

function wakatime() {
	const API_URL = 'https://api.wakatime.com/api/v1/'
	const API_KEY = env('WAKATIME_API_KEY')

	return new API(API_URL, {
		headers: {
			'Authorization': `Basic ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

export {
	discord,
	env,
	envList,
	github,
	gravatar,
	wakatime
}
