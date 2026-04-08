import { env, gravatar } from '@/helpers/api/server'
import { NextResponse } from 'next/server'
import type { Account, Data, GravatarData, Language, Link } from './types'

export async function GET() {
	try {
		const profileSlug = env('GRAVATAR_PROFILE_SLUG')

		const data = await gravatar().get<GravatarData>(`profiles/${profileSlug}`)

		const accounts: Account[] = []
		for (const account of data.verified_accounts) {
			if (!account.is_hidden) {
				accounts.push({
					label: account.service_label,
					url: account.url,
					type: account.service_type,
					image_url: account.service_icon
				})
			}
		}
		accounts.sort((a, b) => a.label.localeCompare(b.label))

		const languages: Language[] = []
		for (const language of data.languages) {
			languages.push({
				label: language.name
			})
		}
		languages.sort((a, b) => a.label.localeCompare(b.label))

		const links: Link[] = []
		for (const link of data.links) {
			links.push({
				label: link.label,
				url: link.url
			})
		}
		links.sort((a, b) => a.label.localeCompare(b.label))

		const response: Data = {
			first_name: data.first_name,
			last_name: data.last_name,
			display_name: data.display_name,
			pronunciation: data.pronunciation,
			pronouns: data.pronouns,
			avatar_url: data.avatar_url,
			profile_url: data.profile_url,
			description: data.description,
			location: data.location,
			accounts,
			languages,
			links
		}

		return NextResponse.json(response)
	} catch {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
