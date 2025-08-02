import { github } from '@/helpers'
import { NextResponse } from 'next/server'
import { Contribution, GitHubContribution } from './types'

export async function GET() {

	const data = await github().post<GitHubContribution>('graphql', {
		body: {
			query: `{
				viewer {
					contributionsCollection {
						contributionCalendar {
							totalContributions
							weeks {
								contributionDays {
									contributionCount
									date
								}
							}
						}
					}
				}
			}`
		}
	})

	const contributionsCount = data.data.viewer.contributionsCollection.contributionCalendar.totalContributions.toLocaleString('en-US')

	const response: Contribution = {
		contributionsCount,
		weeks: data.data.viewer.contributionsCollection.contributionCalendar.weeks.map(week => ({
			contributions: week.contributionDays.map(day => ({
				date: day.date,
				count: day.contributionCount
			}))
		}))
	}

	return NextResponse.json(response)
}
