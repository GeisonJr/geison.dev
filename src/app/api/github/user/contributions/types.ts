export interface GitHubContribution {
	data: {
		viewer: {
			contributionsCollection: {
				contributionCalendar: {
					totalContributions: number,
					weeks: {
						contributionDays: {
							date: string
							contributionCount: number
						}[]
					}[]
				}
			}
		}
	}
}

export interface Contribution {
	contributionsCount: string
	weeks: {
		contributions: {
			date: string
			count: number
		}[]
	}[]
}
