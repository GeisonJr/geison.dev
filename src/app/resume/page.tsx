'use client'

import { Badge, Button, Container, Flex, Link, Map, Separator, Text } from '@/components'
import { ArrowLeftIcon, DownloadIcon, EnvelopeClosedIcon, FileTextIcon, GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon, MobileIcon } from '@radix-ui/react-icons'
import { DataList, Theme as RadixTheme, Select } from '@radix-ui/themes'
import { useState } from 'react'
import { formatDate, formatPeriod, getResume, type CV, type Lang } from './data'
import styles from './styles.module.css'

function Section({ title, children }: React.PropsWithChildren<{ readonly title: string }>) {

	return (
		<Flex direction={'column'} gap={'3'} asChild>
			<section>
				<Flex align={'center'} gap={'3'}>
					<Text size={'5'} weight={'bold'}>
						{title}
					</Text>
					<Separator size={'4'} style={{ flex: 1 }} />
				</Flex>
				{children}
			</section>
		</Flex>
	)
}

function linkIcon(label: string) {
	switch (label) {
		case 'LinkedIn': return <LinkedInLogoIcon />
		case 'GitHub': return <GitHubLogoIcon />
		default: return <GlobeIcon />
	}
}

enum Paper {
	A4 = 'A4',
	Letter = 'Letter'
}

function handlePrint(cv: CV) {
	// Set a descriptive document title so the print/export dialog suggests
	// "Geison Oriani - Software Engineer.pdf" — some ATS index the filename.
	const previousTitle = document.title
	document.title = `${cv.name} - ${cv.title}`
	const restore = () => {
		document.title = previousTitle
		window.removeEventListener('afterprint', restore)
	}
	window.addEventListener('afterprint', restore)
	window.print()
}

/**
 * Inline because @page size/margin must come from React state (the selected paper
 * format) — a static stylesheet can't react to it. The print color fixes (force
 * light + white sheet) live in globals.css, since they apply to any printed page.
 */
function printCss(paper: Paper) {
	const margin = paper === Paper.Letter ? '0.3in' : '0.35in'
	return `
		@page {
			size: ${paper};
			margin: ${margin};
		}
	`
}

export default function Page() {

	const [lang, setLang] = useState<Lang>('en')
	const [paper, setPaper] = useState<Paper>(Paper.A4)

	const { cv, labels, sortedExperiences, sortedProjects, sortedEducation, sortedCertifications } = getResume(lang)

	return (
		// Force light appearance so the printed/exported PDF is always white and
		// high-contrast — ATS- and recruiter-friendly regardless of OS theme.
		<RadixTheme appearance={'light'} accentColor={'green'} grayColor={'auto'} hasBackground>
			<style dangerouslySetInnerHTML={{ __html: printCss(paper) }} />
			<Flex direction={'column'} className={[styles.page, paper === Paper.Letter && styles.letter].filter(Boolean).join(' ')}>
				<Container p={'4'} size={'3'}>
					<Flex direction={'column'} gap={'5'}>
						{/* Toolbar — hidden on print */}
						<Flex className={styles.toolbar} justify={'between'} align={'center'} gap={'2'} wrap={'wrap'}>
							<Link href={'/'}>
								<Flex align={'center'} gap={'1'}>
									<ArrowLeftIcon />
									<Text>
										{labels.back}
									</Text>
								</Flex>
							</Link>
							<Flex align={'center'} gap={'2'} wrap={'wrap'}>
								<Select.Root value={lang} onValueChange={(value) => setLang(value as Lang)} size={'2'}>
									<Select.Trigger variant={'soft'} className={styles.control} />
									<Select.Content>
										<Select.Item value={'en'}>
											{'English'}
										</Select.Item>
										<Select.Item value={'pt'}>
											{'Português'}
										</Select.Item>
									</Select.Content>
								</Select.Root>
								<Select.Root value={paper} onValueChange={(value) => setPaper(value as Paper)} size={'2'}>
									<Select.Trigger variant={'soft'} className={styles.control} />
									<Select.Content>
										<Select.Item value={'A4'}>
											{'A4'}
										</Select.Item>
										<Select.Item value={'Letter'}>
											{'Letter'}
										</Select.Item>
									</Select.Content>
								</Select.Root>
								<Button onClick={() => handlePrint(cv)} variant={'soft'} className={styles.control}>
									<DownloadIcon />
									{labels.download}
								</Button>
								<Button onClick={() => handlePrint(cv)} variant={'solid'} className={styles.control}>
									<FileTextIcon />
									{labels.print}
								</Button>
							</Flex>
						</Flex>

						{/* Header */}
						<Flex direction={'column'} gap={'3'} asChild>
							<header>
								<Text size={'8'} weight={'bold'}>
									{cv.name}
								</Text>
								<Text size={'5'} color={'gray'}>
									{cv.title}
								</Text>
								<Text size={'3'} color={'gray'}>
									{cv.headline}
								</Text>
								<Flex gap={'4'} wrap={'wrap'} mt={'1'}>
									<Flex align={'center'} gap={'1'}>
										<GlobeIcon />
										<Text size={'2'} color={'gray'}>
											{cv.contact.location}
										</Text>
									</Flex>
									<Link href={`mailto:${cv.contact.email}`} size={'2'}>
										<Flex align={'center'} gap={'1'}>
											<EnvelopeClosedIcon />
											{cv.contact.email}
										</Flex>
									</Link>
									{cv.contact.phone && (
										<Link href={`tel:${cv.contact.phone.replace(/[^+\d]/g, '')}`} size={'2'}>
											<Flex align={'center'} gap={'1'}>
												<MobileIcon />
												{cv.contact.phone}
											</Flex>
										</Link>
									)}
								</Flex>
								<Flex gap={'4'} wrap={'wrap'}>
									<Map data={cv.contact.links}>
										{(link) => (
											<Link key={link.href} href={link.href} size={'2'} target={'_blank'}>
												<Flex align={'center'} gap={'1'}>
													{linkIcon(link.label)}
													{link.href.replace(/^https?:\/\//, '')}
												</Flex>
											</Link>
										)}
									</Map>
								</Flex>
							</header>
						</Flex>

						<Section title={labels.summary}>
							<Flex pl={'3'}>
								<Text size={'2'} color={'gray'}>
									{cv.summary}
								</Text>
							</Flex>
						</Section>

						<Section title={labels.skills}>
							<Flex pl={'3'}>
								<DataList.Root size={'2'}>
									<Map data={cv.skills}>
										{(group) => (
											<DataList.Item key={group.label}>
												<DataList.Label minWidth={'160px'}>
													{group.label}
												</DataList.Label>
												<DataList.Value>
													<Flex gap={'2'} wrap={'wrap'}>
														<Map data={group.items}>
															{(item) => (
																<Badge key={item} size={'1'}>
																	{item}
																</Badge>
															)}
														</Map>
														<span className={styles.srOnly}>{group.items.join(', ')}</span>
													</Flex>
												</DataList.Value>
											</DataList.Item>
										)}
									</Map>
								</DataList.Root>
							</Flex>
						</Section>

						<Section title={labels.experience}>
							<Flex direction={'column'} gap={'3'} pl={'3'}>
								<Map data={sortedExperiences}>
									{(exp) => (
										<Flex key={exp.company} direction={'column'} gap={'1'}>
											<Flex align={'baseline'} gap={'2'} wrap={'wrap'}>
												<Text size={'3'} weight={'bold'}>
													{exp.company}
												</Text>
												{exp.location && (
													<Text size={'2'} color={'gray'}>
														{`· ${exp.location}`}
													</Text>
												)}
											</Flex>
											{exp.summary && (
												<Text size={'2'} color={'gray'}>
													{exp.summary}
												</Text>
											)}
											{exp.roles && (
												<Flex direction={'column'} gap={'1'} pl={'3'}>
													<Map data={exp.roles}>
														{(role) => (
															<Flex key={role.title} direction={'column'} gap={'1'} className={styles.role}>
																<Flex justify={'between'} gap={'2'} wrap={'wrap'}>
																	<Text size={'2'} weight={'bold'}>
																		{role.title}
																	</Text>
																	<Text size={'2'} color={'gray'} className={styles.date}>
																		{formatPeriod(role.startDate, role.endDate, lang)}
																	</Text>
																</Flex>
																{role.bullets && role.bullets.length > 0 && (
																	<ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
																		{role.bullets.map((bullet) => (
																			<li key={bullet}>
																				<Text size={'2'} color={'gray'}>{bullet}</Text>
																			</li>
																		))}
																	</ul>
																)}
															</Flex>
														)}
													</Map>
												</Flex>
											)}
										</Flex>
									)}
								</Map>
							</Flex>
						</Section>

						<Section title={labels.projects}>
							<Flex direction={'column'} gap={'3'} pl={'3'}>
								<Map data={sortedProjects}>
									{(project) => (
										<Flex key={project.name} direction={'column'} gap={'1'} className={styles.avoidBreak}>
											<Flex justify={'between'} align={'start'} gap={'2'} wrap={'wrap'}>
												{project.href ? (
													<Link href={project.href} size={'3'} target={'_blank'} weight={'bold'}>
														{project.name}
													</Link>
												) : (
													<Text size={'3'} weight={'bold'}>
														{project.name}
													</Text>
												)}
												{project.startDate && (
													<Text size={'2'} color={'gray'} className={styles.date}>
														{formatPeriod(project.startDate, project.endDate ?? null, lang)}
													</Text>
												)}
											</Flex>
											<Text size={'2'} color={'gray'}>
												{project.description}
											</Text>
										</Flex>
									)}
								</Map>
							</Flex>
						</Section>

						<Section title={labels.education}>
							<Flex direction={'column'} gap={'3'} pl={'3'}>
								<Map data={sortedEducation}>
									{(edu) => (
										<Flex key={edu.degree + edu.school} direction={'column'} gap={'1'} className={styles.avoidBreak}>
											<Flex justify={'between'} align={'start'} gap={'2'} wrap={'wrap'}>
												<Text size={'3'} weight={'bold'}>
													{edu.school}
												</Text>
												<Text size={'2'} color={'gray'} className={styles.date}>
													{formatPeriod(edu.startDate, edu.endDate, lang)}
												</Text>
											</Flex>
											<Text size={'2'} color={'gray'}>
												{edu.degree}
											</Text>
										</Flex>
									)}
								</Map>
							</Flex>
						</Section>

						<Section title={labels.certifications}>
							<Flex direction={'column'} gap={'2'} pl={'3'}>
								<Map data={sortedCertifications}>
									{(cert) => (
										<Flex key={cert.title} justify={'between'} align={'baseline'} gap={'2'} wrap={'wrap'} className={styles.avoidBreak}>
											<Text size={'2'}>
												{cert.href ? (
													<Link href={cert.href} target={'_blank'} weight={'bold'}>
														{cert.title}
													</Link>
												) : (
													<Text as={'span'} weight={'bold'}>
														{cert.title}
													</Text>
												)}
												<Text as={'span'} color={'gray'}>
													{` · ${cert.issuer}`}
												</Text>
											</Text>
											<Text size={'2'} color={'gray'} className={styles.date}>
												{formatDate(cert.date, lang)}
											</Text>
										</Flex>
									)}
								</Map>
							</Flex>
						</Section>

						<Section title={labels.languages}>
							<Flex pl={'3'}>
								<DataList.Root size={'2'}>
									<Map data={cv.languages}>
										{(language) => (
											<DataList.Item key={language.label}>
												<DataList.Label minWidth={'160px'}>
													{language.label}
												</DataList.Label>
												<DataList.Value>
													{language.level}
												</DataList.Value>
											</DataList.Item>
										)}
									</Map>
								</DataList.Root>
							</Flex>
						</Section>
					</Flex>
				</Container>
			</Flex>
		</RadixTheme>
	)
}
