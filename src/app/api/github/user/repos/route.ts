import { github } from '@/helpers'
import { NextResponse } from 'next/server'
import type { GitHubRepo, Repo } from './types'

export async function GET() {

	const data = await github().get<GitHubRepo[]>('user/repos')

	const filteredRepos = data
		.filter(repo => !!repo.topics.includes('portfolio'))
		// .filter(repo => !repo.disabled)
		// .filter(repo => !repo.archived)
		// .filter(repo => !repo.private)
		// .filter(repo => !repo.fork)
		.sort((a, b) =>
			b.stargazers_count - a.stargazers_count ||
			b.watchers_count - a.watchers_count ||
			b.forks_count - a.forks_count
		)

	const response: Repo[] = []
	for (const repository of filteredRepos) {

		const badges = []
		if (repository.private) {
			badges.push({
				color: 'red',
				text: 'Private',
				title: 'This repository is private',
			})
		} else {
			badges.push({
				color: 'green',
				text: 'Public',
				title: repository.html_url,
				url: repository.html_url,
			})
		}

		if (repository.archived) {
			badges.push({
				color: 'red',
				text: 'Archived',
				title: 'This repository is archived and is no longer maintained.',
			})
		}

		if (repository.homepage) {
			badges.push({
				color: 'purple',
				text: 'Website',
				title: repository.homepage,
				url: repository.homepage,
			})
		}

		if (repository.language) {
			badges.push({
				color: 'blue',
				text: repository.language,
				title: 'Most used language'
			})
		}

		if (repository.fork) {
			badges.push({
				color: 'yellow',
				text: 'Forked',
				title: 'This repository is a fork of another repository',
			})
		}

		if (repository.watchers_count > 0) {
			badges.push({
				color: 'orange',
				text: repository.watchers_count + ' watchers',
			})
		}

		if (repository.forks_count > 0) {
			badges.push({
				color: 'iris',
				text: repository.forks_count + ' forks',
			})
		}

		if (repository.open_issues_count > 0) {
			badges.push({
				color: 'grass',
				text: repository.open_issues_count + ' issues',
				title: 'Open issues'
			})
		}

		if (repository.topics.length > 0) {
			badges.push({
				color: 'bronze',
				text: repository.topics.length + ' topics',
				title: repository.topics.join(', '),
			})
		}

		if (repository.license) {
			badges.push({
				color: 'gray',
				text: repository.license.spdx_id,
				title: repository.license.name,
			})
		}

		response.push({
			id: repository.id,
			name: repository.full_name,
			description: repository.description ?? repository.name,
			url: repository.html_url,
			forks_count: repository.forks_count,
			stargazers_count: repository.stargazers_count,
			watchers_count: repository.watchers_count,
			homepage: repository.homepage,
			badges
		})
	}

	return NextResponse.json(response)
}
