'use client'

import { Avatar, Container, Flex, If, Link, Map, Masonry, Separator, Skeleton, Text } from '@/components'
import { api } from '@/helpers'
import { DataList } from '@radix-ui/themes'
import useSWR from 'swr'
import type { Account, Data } from '../api/gravatar/profile/types'

function fetcher<T>(url: string): Promise<T> {
	return api().get<T>(url)
}

export default function Page() {

	const { data: profile } = useSWR<Data>('gravatar/profile', fetcher)

	return (
		<Flex direction={'column'}>
			<Container
				p={'4'}
				size={'4'}
				style={{
					backgroundColor: 'var(--gray-2)',
				}}
			>
				<Flex direction={'column'} gap={'4'}>
					<Flex justify={'between'}>
						<Flex align={'center'} gap={'4'}>
							<Text size={'6'} weight={'bold'}>
								{'Gravatar'}
							</Text>
							<Separator orientation={'vertical'} size={'2'} />
							<Flex direction={'column'} gap={'1'}>
								<Skeleton loading={profile?.display_name === undefined}>
									<Text size={'4'} weight={'bold'}>
										{profile?.display_name ?? 'Loading...'}
									</Text>
								</Skeleton>
								<Skeleton loading={profile?.description === undefined}>
									<Text color={'gray'} size={'2'}>
										{profile?.description ?? 'Loading...'}
									</Text>
								</Skeleton>
							</Flex>
						</Flex>
						<Flex align={'center'} gap={'4'}>
							<Skeleton loading={profile?.profile_url === undefined}>
								<Link href={profile?.profile_url} size={'4'} target={'_blank'}>
									{'See profile'}
								</Link>
							</Skeleton>
						</Flex>
					</Flex>
					<Separator size={'4'} />
					<Flex gap={'4'} justify={'between'}>
						<Flex flexBasis={'100%'}>
							<DataList.Root size={'3'}>
								<DataList.Item>
									<DataList.Label>
										{'Pronunciation'}
									</DataList.Label>
									<DataList.Value>
										<Skeleton loading={profile?.pronunciation === undefined}>
											{profile?.pronunciation ?? 'Loading...'}
										</Skeleton>
									</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>
										{'Pronouns'}
									</DataList.Label>
									<DataList.Value>
										<Skeleton loading={profile?.pronouns === undefined}>
											{profile?.pronouns ?? 'Loading...'}
										</Skeleton>
									</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>
										{'Location'}
									</DataList.Label>
									<DataList.Value>
										<Skeleton loading={profile?.location === undefined}>
											{profile?.location ?? 'Loading...'}
										</Skeleton>
									</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>
										{'Languages'}
									</DataList.Label>
									<DataList.Value>
										<Skeleton loading={profile?.languages === undefined}>
											{profile?.languages.map((language) => language.label).join(', ') ?? 'Loading...'}
										</Skeleton>
									</DataList.Value>
								</DataList.Item>
							</DataList.Root>
						</Flex>
						<Separator orientation={'vertical'} size={'4'} />
						<Flex
							direction={'column'}
							flexBasis={'100%'}
							gap={'2'}
						>
							<Text color={'gray'} size={'2'} weight={'bold'}>
								<Text size={'2'} weight={'bold'}>
									{'Accounts'}
								</Text>
							</Text>
							<Masonry gap={'2'} minWidth={'150px'}>
								<If condition={profile?.accounts === undefined}>
									<AccountCard />
									<AccountCard />
									<AccountCard />
									<AccountCard />
								</If>
								<Map data={profile?.accounts ?? []}>
									{(account) => (
										<AccountCard data={account} />
									)}
								</Map>
							</Masonry>
						</Flex>
					</Flex>
				</Flex>
			</Container>
		</Flex>
	)
}

function AccountCard({ data }: { data?: Account }) {
	return (
		<Flex align={'center'} gap={'2'}>
			<Skeleton loading={data?.image_url === undefined}>
				<Avatar
					fallback={'Loading...'}
					size={'2'}
					src={data?.image_url ?? ''}
					style={{
						backgroundColor: 'var(--gray-12)',
						borderRadius: '8px'
					}}
				/>
			</Skeleton>
			<Flex direction={'column'} gap={'1'} overflow={'hidden'}>
				<Skeleton loading={data?.label === undefined}>
					<Link href={data?.url} size={'2'} truncate>
						{data?.label ?? 'Loading...'}
					</Link>
				</Skeleton>
			</Flex>
		</Flex>
	)
}
