'use client'

import { Avatar, Badge, Container, Flex, If, Link, Map, Masonry, Separator, Skeleton, Text } from '@/components'
import { api } from '@/helpers'
import useSWR from 'swr'
import { Guild } from '../api/discord/guild/types'
import type { Member, Widget } from '../api/discord/widget/types'

function fetcher<T>(url: string): Promise<T> {
	return api().get<T>(url)
}

export default function Page() {

	const { data: guild } = useSWR<Guild>('discord/guild', fetcher)
	const { data: widget } = useSWR<Widget>('discord/widget', fetcher)

	return (
		<Flex direction={'column'}>
			<Container
				p={'4'}
				size={'4'}
				style={{
					backgroundColor: 'var(--gray-5)'
				}}
			>
				<Flex direction={'column'} gap={'4'}>
					<Flex gap={'4'} justify={'between'}>
						<Flex align={'center'} gap={'4'}>
							<Text size={'6'} weight={'bold'}>
								{'Discord'}
							</Text>
							<Separator orientation={'vertical'} size={'2'} />
							<Flex direction={'column'} gap={'1'}>
								<Skeleton loading={widget?.name === undefined}>
									<Text size={'4'} weight={'bold'}>
										{widget?.name ?? 'Loading...'}
									</Text>
								</Skeleton>
								<Skeleton loading={guild?.description === undefined}>
									<Text color={'gray'} size={'2'}>
										{guild?.description ?? 'Loading...'}
									</Text>
								</Skeleton>
							</Flex>
						</Flex>
						<Flex align={'center'} gap={'4'}>
							<Skeleton loading={widget?.presence_count === undefined || guild?.approximate_member_count === undefined}>
								<Text wrap={'nowrap'}>
									{`${widget?.presence_count ?? 99} online, ${guild?.approximate_member_count ?? 999} members`}
								</Text>
							</Skeleton>
							<Separator orientation={'vertical'} />
							<Skeleton loading={widget?.invite_url === undefined}>
								<Link href={widget?.invite_url} size={'4'} target={'_blank'} wrap={'nowrap'}>
									{'Join server'}
								</Link>
							</Skeleton>
						</Flex>
					</Flex>
					<Separator size={'4'} />
					<Masonry gap={'1'} minWidth={'200px'}>
						<If condition={widget?.presence_members === undefined}>
							<WidgetMember />
							<WidgetMember />
							<WidgetMember />
							<WidgetMember />
							<WidgetMember />
							<WidgetMember />
							<WidgetMember />
						</If>
						<Map data={widget?.presence_members ?? []}>
							{(member) => (
								<WidgetMember
									key={member.id}
									data={member}
								/>
							)}
						</Map>
					</Masonry>
				</Flex>
			</Container>
		</Flex>
	)
}

function WidgetMember({ data }: { data?: Member }) {

	return (
		<Flex align={'center'} gap={'2'}>
			<Skeleton loading={data?.avatar === undefined}>
				<Avatar
					fallback={'Loading...'}
					size={'2'}
					src={data?.avatar ?? ''}
					style={{
						borderRadius: '50%'
					}}
				/>
			</Skeleton>
			<Flex direction={'column'} gap={'1'} overflow={'hidden'}>
				<Skeleton loading={data?.activity === undefined}>
					<Text color={'gray'} size={'2'} truncate>
						{data?.activity ?? 'Loading...'}
					</Text>
				</Skeleton>
				<Skeleton loading={data?.status === undefined}>
					<Flex>
						<Badge color={(data?.color as 'gray') ?? 'gray'}>
							{data?.status ?? 'Loading...'}
						</Badge>
					</Flex>
				</Skeleton>
			</Flex>
		</Flex>
	)
}

