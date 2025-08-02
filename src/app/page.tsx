'use client'

import { Badge, Container, Flex, If, Map, Separator, Skeleton, Text } from '@/components'
import { api } from '@/helpers'
import { DataList } from '@radix-ui/themes'
import useSWR from 'swr'
import type { Attribute, Me } from './api/me/types'

function fetcher<T>(url: string): Promise<T> {
	return api().get('/' + url)
}

export default function Page() {

	const { data: me } = useSWR<Me>('me', fetcher)

	return (
		<Flex direction={'column'}>
			<Container p={'4'} size={'4'}>
				<Flex direction={'column'} gap={'4'}>
					<Flex direction={'column'} gap={'2'}>
						<Skeleton loading={me?.name === undefined}>
							<Text size={'8'} weight={'bold'}>
								{me?.name ?? 'Loading...'}
							</Text>
						</Skeleton>
						<Skeleton loading={me?.description === undefined}>
							<Text size={'5'} color={'gray'}>
								{me?.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
							</Text>
						</Skeleton>
					</Flex>
					<Separator size={'4'} />
					<DataList.Root size={'3'}>
						<DataList.Item>
							<DataList.Label>
								{'Age'}
							</DataList.Label>
							<DataList.Value>
								<Skeleton loading={me?.age === undefined}>
									{`${me?.age ?? '99'} years old`}
								</Skeleton>
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>
								{'Strengths'}
							</DataList.Label>
							<DataList.Value>
								<Flex gap={'2'}>
									<If condition={me?.strengths === undefined}>
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
									</If>
									<Map data={me?.strengths ?? []}>
										{(item) => (
											<BadgeCard data={item} />
										)}
									</Map>
								</Flex>
							</DataList.Value>
						</DataList.Item>
						<DataList.Item>
							<DataList.Label>
								{'Weaknesses'}
							</DataList.Label>
							<DataList.Value>
								<Flex gap={'2'}>
									<If condition={me?.weaknesses === undefined}>
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
										<BadgeCard />
									</If>
									<Map data={me?.weaknesses ?? []}>
										{(item) => (
											<BadgeCard data={item} />
										)}
									</Map>
								</Flex>
							</DataList.Value>
						</DataList.Item>
					</DataList.Root>
				</Flex>
			</Container>
		</Flex>
	)
}

function BadgeCard({ data }: { data?: Attribute }) {

	return (
		<Flex direction={'column'} gap={'2'}>
			<Skeleton loading={data?.label === undefined}>
				<Badge size={'3'}>
					{data?.label ?? 'Loading...'}
				</Badge>
			</Skeleton>
		</Flex>
	)
}
