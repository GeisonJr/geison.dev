'use client'

import { Badge, Card, Container, Flex, If, Link, Map, Masonry, Separator, Skeleton, Text } from '@/components'
import { api } from '@/helpers'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { ScrollArea, Tooltip } from '@radix-ui/themes'
import { Fragment } from 'react'
import useSWR from 'swr'
import { Contribution } from '../api/github/user/contributions/types'
import type { Repo } from '../api/github/user/repos/types'
import type { User } from '../api/github/user/types'

function fetcher<T>(url: string): Promise<T> {
	return api().get<T>(url)
}

export default function Page() {

	const { data: user } = useSWR<User>('github/user', fetcher)
	const { data: repos } = useSWR<Repo[]>('github/user/repos', fetcher)
	const { data: contributions } = useSWR<Contribution>('github/user/contributions', fetcher)

	return (
		<Flex direction={'column'}>
			<Container
				p={'4'}
				size={'4'}
				style={{
					backgroundColor: 'var(--gray-3)',
				}}
			>
				<Flex direction={'column'} gap={'4'}>
					<Flex justify={'between'}>
						<Flex align={'center'} gap={'4'}>
							<Text size={'6'} weight={'bold'}>
								{'GitHub'}
							</Text>
							<Separator orientation={'vertical'} size={'2'} />
							<Skeleton loading={user?.name === undefined}>
								<Text size={'4'} weight={'bold'}>
									{user?.name ?? 'Loading...'}
								</Text>
							</Skeleton>
						</Flex>
						<Flex align={'center'} gap={'4'}>
							<Skeleton loading={user?.url === undefined}>
								<Link href={user?.url} size={'4'} target={'_blank'}>
									{'See profile'}
								</Link>
							</Skeleton>
						</Flex>
					</Flex>
					<Separator size={'4'} />
					<Flex justify={'between'} direction={'column'} gap={'4'}>
						<Text>
							{`${contributions?.contributionsCount ?? 0} contributions in the last year`}
						</Text>
						<Skeleton loading={contributions === undefined}>
							<ContributionsChart data={contributions} />
						</Skeleton>
					</Flex>
					<Separator size={'4'} />
					<Flex align={'center'} gap={'4'} justify={'between'}>
						<Text size={'4'}>
							{'Repositories'}
						</Text>
						<Skeleton loading={repos === undefined || user === undefined}>
							<Text>
								{`${repos?.length ?? 99} repositories, ${user?.followers ?? 99} followers`}
							</Text>
						</Skeleton>
					</Flex>
					<Masonry gap={'2'} minWidth={'300px'}>
						<If condition={repos === undefined}>
							<RepositoryCard />
							<RepositoryCard />
							<RepositoryCard />
							<RepositoryCard />
							<RepositoryCard />
						</If>
						<Map data={repos ?? []}>
							{(repository) => (
								<RepositoryCard
									key={repository.id}
									data={repository}
								/>
							)}
						</Map>
					</Masonry>
				</Flex>
			</Container>
		</Flex>
	)
}

function prepareColorIntensity(count: number, max: number): string {
	if (count === 0) return '#151b23'
	if (count < max * 0.2) return '#033a16'
	if (count < max * 0.4) return '#196c2e'
	if (count < max * 0.6) return '#2ea043'
	return '#56d364'
}

function ContributionsChart({ data }: { data?: Contribution }) {

	// Find the maximum contribution count for color intensity scaling
	const max = data?.weeks.reduce((max, week) => {
		const weekMax = week.contributions.reduce((wMax, c) => Math.max(wMax, c.count), 0)
		return Math.max(max, weekMax)
	}, 0) ?? 0

	return (
		<ScrollArea scrollbars={'horizontal'} type={'hover'}>
			<Flex direction={'row'} gap={'1'} pb={'4'}>
				<Map data={data?.weeks ?? []}>
					{(week) => {
						const { contributions } = week

						return (
							<Flex direction={'column'} gap={'1'}>
								<Map data={contributions}>
									{(contribution) => {
										const backgroundColor = prepareColorIntensity(contribution.count, max)

										return (
											<Tooltip content={`${contribution.count} contributions on ${contribution.date}`}>
												<Flex
													key={contribution.date}
													align={'center'}
													height={'18px'}
													justify={'center'}
													width={'18px'}
													style={{
														backgroundColor,
														borderRadius: '2px'
													}}
												/>
											</Tooltip>
										)
									}}
								</Map>
							</Flex>
						)
					}}
				</Map>
			</Flex>
		</ScrollArea>
	)
}

function RepositoryCard({ data }: { data?: Repo }) {

	return (
		<Card>
			<Flex direction={'column'} gap={'2'} height={'100%'}>
				<Flex direction={'column'} gap={'2'}>
					<Flex justify={'between'}>
						<Skeleton loading={data?.name === undefined}>
							<Text size={'4'}>
								{data?.name ?? 'Loading...'}
							</Text>
						</Skeleton>
						<Flex gap={'2'}>
							{/* <If condition={data?.watchers_count === undefined || data?.watchers_count > 0}>
								<Skeleton loading={data?.watchers_count === undefined}>
									<Badge color={'blue'} size={'2'}>
										{data?.watchers_count ?? '99'}
										<EyeOpenIcon />
									</Badge>
								</Skeleton>
							</If> */}
							{/* <If condition={data?.forks_count === undefined || data?.forks_count > 0}>
								<Skeleton loading={data?.forks_count === undefined}>
									<Badge color={'amber'} size={'2'}>
										{data?.forks_count ?? '99'}
										<LightningBoltIcon />
									</Badge>
								</Skeleton>
							</If> */}
							<If condition={data?.stargazers_count === undefined || data?.stargazers_count > 0}>
								<Skeleton loading={data?.stargazers_count === undefined}>
									<Badge color={'yellow'} size={'2'}>
										{data?.stargazers_count ?? '99'}
										<StarFilledIcon />
									</Badge>
								</Skeleton>
							</If>
						</Flex>
					</Flex>
					<Skeleton loading={data?.description === undefined}>
						<Text color={'gray'} size={'3'} truncate>
							{data?.description ?? 'Loading...'}
						</Text>
					</Skeleton>
				</Flex>
				<Flex align={'end'} gap={'2'} height={'100%'} wrap={'wrap'}>
					<If condition={data?.badges === undefined}>
						<Skeleton loading>
							<Badge size={'2'}>
								{'Loading...'}
							</Badge>
						</Skeleton>
						<Skeleton loading>
							<Badge size={'2'}>
								{'Loading...'}
							</Badge>
						</Skeleton>
					</If>
					<Map data={data?.badges ?? []}>
						{(badge) => (
							<Fragment>
								<Tooltip content={badge.title} hidden={!badge.title}>
									<Badge
										key={badge.text}
										color={(badge.color as 'gray') ?? 'gray'}
										size={'2'}
									>
										<If condition={!badge.url}>
											<Text size={'1'}>
												{badge.text}
											</Text>
										</If>
										<If condition={!!badge.url}>
											<Link href={badge.url} size={'1'} target={'_blank'}>
												{badge.text}
											</Link>
										</If>
									</Badge>
								</Tooltip>
							</Fragment>
						)}
					</Map>
				</Flex>
			</Flex>
		</Card>
	)
}

