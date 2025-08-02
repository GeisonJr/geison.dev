'use client'

import { Container, Flex, If, Link, Map, Masonry, Separator, Skeleton, Text } from '@/components'
import { api } from '@/helpers'
import { Progress } from '@radix-ui/themes'
import useSWR from 'swr'
import type { Data, Language } from '../api/wakatime/[range]/types'

function fetcher<T>(url: string): Promise<T> {
	return api().get<T>(url)
}

export default function Page() {

	const { data: last_year } = useSWR<Data>('wakatime/last_year', fetcher)
	const { data: last_30_days } = useSWR<Data>('wakatime/last_30_days', fetcher)

	return (
		<Flex direction={'column'}>
			<Container
				p={'4'}
				size={'4'}
				style={{
					backgroundColor: 'var(--gray-4)',
				}}
			>
				<Flex direction={'column'} gap={'4'}>
					<Flex justify={'between'}>
						<Flex align={'center'} gap={'4'}>
							<Text size={'6'} weight={'bold'}>
								{'WakaTime'}
							</Text>
							<Separator orientation={'vertical'} size={'2'} />
							<Skeleton loading={last_30_days?.profile_name === undefined}>
								<Text size={'4'} weight={'bold'}>
									{last_30_days?.profile_name ?? 'Loading...'}
								</Text>
							</Skeleton>
						</Flex>
						<Flex align={'center'} gap={'4'}>
							<Skeleton loading={last_30_days?.profile_url === undefined}>
								<Link href={last_30_days?.profile_url} size={'4'} target={'_blank'}>
									{'See profile'}
								</Link>
							</Skeleton>
						</Flex>
					</Flex>
					<Separator size={'4'} />
					<Flex align={'center'} gap={'4'} justify={'between'}>
						<Skeleton loading={last_year?.range === undefined}>
							<Text size={'4'}>
								{last_year?.range ?? 'Loading...'}
							</Text>
						</Skeleton>
						<Skeleton loading={last_year?.daily_average === undefined}>
							<Text>
								{`Daily average: ${last_year?.daily_average ?? '999 hrs 60 mins'}, Total: ${last_year?.total ?? '999 hrs 60 mins'}`}
							</Text>
						</Skeleton>
					</Flex>
					<Masonry gap={'2'} gapX={'5'} minWidth={'200px'}>
						<If condition={last_year?.languages === undefined}>
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
						</If>
						<Map data={last_year?.languages ?? []}>
							{(member) => (
								<LanguageCard
									key={member.name}
									data={member}
								/>
							)}
						</Map>
					</Masonry>
					<Separator size={'4'} />
					<Flex align={'center'} gap={'4'} justify={'between'}>
						<Skeleton loading={last_30_days?.range === undefined}>
							<Text size={'4'}>
								{last_30_days?.range ?? 'Loading...'}
							</Text>
						</Skeleton>
						<Skeleton loading={last_30_days?.daily_average === undefined}>
							<Text>
								{`Daily average: ${last_30_days?.daily_average ?? '999 hrs 60 mins'}, Total: ${last_30_days?.total ?? '999 hrs 60 mins'}`}
							</Text>
						</Skeleton>
					</Flex>
					<Masonry gap={'2'} gapX={'5'} minWidth={'200px'}>
						<If condition={last_30_days?.languages === undefined}>
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
							<LanguageCard />
						</If>
						<Map data={last_30_days?.languages ?? []}>
							{(member) => (
								<LanguageCard
									key={member.name}
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

function LanguageCard({ data }: { data?: Language }) {

	return (
		<Flex align={'center'} gap={'2'} width={'100%'}>
			<Flex direction={'column'} gap={'0'} overflow={'hidden'} width={'100%'}>
				<Skeleton loading={data?.name === undefined}>
					<Flex>
						{data?.name ?? 'Loading...'}
					</Flex>
				</Skeleton>
				<Skeleton loading={data?.text === undefined}>
					<Text color={'gray'} size={'2'} truncate>
						{data?.text ?? 'Loading...'}
					</Text>
				</Skeleton>
				<Skeleton loading={data?.percent === undefined}>
					<Flex align={'center'} gap={'2'}>
						<Progress
							size={'3'}
							value={data?.percent}
							variant={'soft'}
						/>
						<Text size={'2'} color={'gray'}>
							{`${data?.percent?.toFixed(2) ?? '0'}%`}
						</Text>
					</Flex>
				</Skeleton>
			</Flex>
		</Flex>
	)
}
