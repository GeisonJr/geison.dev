import { wakatime } from '@/helpers/api/server'
import { type NextRequest, NextResponse } from 'next/server'
import type { Data, Language, WakatimeData } from './types'

const VALID_RANGES = ['all_time', 'last_7_days', 'last_30_days', 'last_6_months', 'last_year'] as const

interface Context {
	params: Promise<{
		range: typeof VALID_RANGES[number]
	}>
}

export async function GET(_req: NextRequest, { params }: Context) {
	try {
		const { range } = await params

		if (!VALID_RANGES.includes(range)) {
			return NextResponse.json({ error: 'Invalid range' }, { status: 400 })
		}

		const data = await wakatime().get<WakatimeData>('users/current/stats/' + range)

		const keepLangs = [
			'TypeScript',
			'JavaScript',
			'ObjectPascal',
			'Prisma',
			'Bash',
			'SQL',
			'YAML',
			'HTML',
			'CSS'
		]

		const others = {
			total_seconds: 0,
			percent: 0
		}

		const languages: Language[] = []
		for (const language of data.data.languages) {
			if (keepLangs.includes(language.name)) {
				languages.push({
					name: language.name,
					percent: language.percent,
					text: language.text
				})
				continue
			}

			others.total_seconds += language.total_seconds
			others.percent += language.percent
		}
		languages.sort((a, b) => b.percent - a.percent)

		if (others.total_seconds > 0) {
			languages.push({
				name: 'Others',
				percent: others.percent,
				text: formatSeconds(others.total_seconds)
			})
		}

		const response: Data = {
			profile_name: data.data.username,
			profile_url: `https://wakatime.com/@${data.data.user_id}`,
			daily_average: data.data.human_readable_daily_average_including_other_language,
			total: data.data.human_readable_total_including_other_language,
			range: data.data.human_readable_range,
			languages
		}

		return NextResponse.json(response)
	} catch {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}

function formatSeconds(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	return `${hours} hrs ${minutes} mins`
}
