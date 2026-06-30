/** ISO 8601 subset: YYYY | YYYY-MM | YYYY-MM-DD | YYYY-MM-DDTHH:MM:SSZ */
export type ISODate = string

export interface Contact {
	location: string
	email: string
	phone?: string
	links: Array<{ label: string; href: string }>
}

export interface SkillGroup {
	label: string
	items: string[]
}

export interface Role {
	title: string
	startDate: ISODate
	endDate: ISODate | null
	bullets?: string[]
}

export interface Experience {
	company: string
	startDate?: ISODate
	endDate?: ISODate | null
	location?: string
	summary?: string
	roles?: Role[]
}

export interface Project {
	name: string
	description: string
	href?: string
	startDate?: ISODate
	endDate?: ISODate | null
	/** Higher value sorts first in Selected Projects; defaults to 0. */
	priority?: number
}

export interface Education {
	degree: string
	school: string
	startDate: ISODate
	endDate?: ISODate
}

export interface Certification {
	title: string
	speaker?: string
	issuer: string
	date: ISODate
	href?: string
}

export interface Language {
	label: string
	level: string
}

export interface CV {
	name: string
	title: string
	headline: string
	contact: Contact
	summary: string
	skills: SkillGroup[]
	experiences: Experience[]
	projects: Project[]
	education: Education[]
	certifications: Certification[]
	languages: Language[]
}

type Precision = 'year' | 'month' | 'day' | 'time'

function parseISO(iso: ISODate): { date: Date; precision: Precision } {
	const hasTime = iso.includes('T')
	const [datePart] = iso.split('T')
	const parts = datePart.split('-')

	if (parts.length === 1) {
		return { date: new Date(Number(parts[0]), 0), precision: 'year' }
	}
	if (parts.length === 2) {
		return { date: new Date(Number(parts[0]), Number(parts[1]) - 1), precision: 'month' }
	}

	const date = hasTime ? new Date(iso) : new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
	return { date, precision: hasTime ? 'time' : 'day' }
}

const locale = 'en-US'

const dtf = {
	year: new Intl.DateTimeFormat(locale, {
		year: 'numeric'
	}),
	monthShort: new Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric'
	}),
	monthLong: new Intl.DateTimeFormat(locale, {
		month: 'long',
		year: 'numeric'
	}),
	dayShort: new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}),
	dayLong: new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	}),
	time: new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	})
}

export function formatDate(iso: ISODate, style: 'short' | 'long' = 'short'): string {
	const { date, precision } = parseISO(iso)
	if (precision === 'year') return dtf.year.format(date)
	if (precision === 'month') return (style === 'long' ? dtf.monthLong : dtf.monthShort).format(date)
	if (precision === 'day') return (style === 'long' ? dtf.dayLong : dtf.dayShort).format(date)
	return dtf.time.format(date)
}

export function formatPeriod(start: ISODate, end?: ISODate | null, style: 'short' | 'long' = 'short'): string {
	return `${formatDate(start, style)} - ${end ? formatDate(end, style) : 'Present'}`
}

export const cv: CV = {
	name: 'Geison Oriani',
	title: 'Software Development Engineer',
	headline: 'Back-end · TypeScript · Node.js · GCP · Kubernetes · Distributed Systems',
	contact: {
		location: 'Piracicaba, SP, Brazil',
		email: 'contato@geison.dev',
		phone: '+55 19 99626-6221',
		links: [{
			label: 'LinkedIn',
			href: 'https://linkedin.com/in/geisonjr'
		}, {
			label: 'GitHub',
			href: 'https://github.com/GeisonJr'
		}, {
			label: 'Portfolio',
			href: 'https://geison.dev'
		}]
	},
	summary: 'Software Development Engineer with 5+ years building scalable, distributed backend systems in TypeScript and Node.js. At Luizalabs, I owned 12 production services processing ~500K shipments/day on GCP and Kubernetes — full end-to-end ownership, from system design to on-call. Previously grew from intern to Technical Lead at HPro, leading a team of 5.',
	skills: [{
		label: 'Languages & Back-end',
		items: [
			'TypeScript',
			'JavaScript',
			'Node.js',
			'NestJS',
			'SQL',
			'Microservices'
		]
	}, {
		label: 'Architecture',
		items: [
			'System Design',
			'Distributed Systems',
			'Event-Driven Architecture',
			'High Availability',
			'Scalability'
		]
	}, {
		label: 'Data & Messaging',
		items: [
			'PostgreSQL',
			'MySQL',
			'Redis',
			'RabbitMQ',
			'Google Pub/Sub',
			'BigQuery'
		]
	}, {
		label: 'Cloud, DevOps & Observability',
		items: [
			'GCP',
			'AWS',
			'Kubernetes',
			'Docker',
			'ArgoCD',
			'CI/CD',
			'Linux',
			'Datadog',
			'Grafana'
		]
	}, {
		label: 'Front-end',
		items: [
			'React.js',
			'Next.js',
			'React Native'
		]
	}],
	experiences: [{
		company: 'Luizalabs',
		location: 'Remote (Brazil)',
		roles: [{
			title: 'Software Developer',
			startDate: '2025-09',
			endDate: '2026-06',
			bullets: [
				'Owned end-to-end (system design → deployment → on-call) 12 production services (5 APIs, 2 BFFs, 3 workers, 2 frontends) in TypeScript/Node.js for the shipping and carrier integration domain — covering postage, Correios API, carrier integrations, and label generation, processing ~500K shipments per day — deployed on GCP and MGC (Magalu Cloud) via Kubernetes and ArgoCD.',
				'Collaborated with a team of 6 engineers, shipping ~4 production deploys per week using GitLab CI/CD and ArgoCD (GitOps) under Agile/Kanban workflows.',
				'Designed event-driven workflows with RabbitMQ and Google Pub/Sub, powering a notification system that reacts to domain events (replication events, label availability, payment approval, and invoice issuance), with Redis for caching and shipment state.',
				'Instrumented services with Datadog and Grafana for error tracking, performance, and infrastructure monitoring, with alerting across all production services.',
				'Queried logistics data in Google BigQuery for operational metrics and carrier performance reporting; wrote unit and integration tests with Jest and conducted code reviews to enforce quality standards.'
			]
		}]
	}, {
		company: 'HPro — Soluções de TI para Gestão Corporativa',
		location: 'Piracicaba, SP, Brazil',
		roles: [{
			title: 'Technical Lead',
			startDate: '2024-04',
			endDate: '2025-08',
			bullets: [
				'Led a team of 5 engineers delivering an ERP platform for corporate IT management, owning architecture decisions and sprint planning.',
				'Drove the web modernization of selected legacy Delphi/Object Pascal modules — remaking them for web and integrating with a new Node.js/TypeScript application for new web and mobile features — while the core backend remained in Delphi, without disrupting ongoing deliveries.',
				'Designed and delivered a mobile module using React Native (Expo), expanding the ERP to field technicians and mobile users.',
				'Established engineering standards (Git branching, PR reviews, Agile/Scrum ceremonies) and mentored junior/mid engineers through pair programming and design reviews, improving delivery predictability.'
			]
		}, {
			title: 'Senior Software Developer',
			startDate: '2023-08',
			endDate: '2024-03',
			bullets: [
				'Designed and implemented full-stack features across Node.js/TypeScript backend, React/React Native frontend, and Delphi/Object Pascal legacy code, integrating with SQL and SQLite databases.',
				'Owned end-to-end delivery of modules from technical specification through production deployment under Agile/Scrum methodology.'
			]
		}, {
			title: 'Software Developer',
			startDate: '2022-10',
			endDate: '2023-07',
		}, {
			title: 'Junior Software Developer',
			startDate: '2021-12',
			endDate: '2022-09',
		}, {
			title: 'Software Development Intern',
			startDate: '2021-06',
			endDate: '2021-11',
		}]
	}, {
		company: 'Grupo Tork',
		location: 'Piracicaba, SP, Brazil',
		roles: [{
			title: 'IT Support Technician',
			startDate: '2017-01',
			endDate: '2021-05',
		}]
	}],
	projects: [{
		name: 'Tork Track',
		description: 'Freelance full-stack field-service platform for Tork Express do Brasil — service-order lifecycle (clients, inventory, scheduling, audit trails, reporting) plus a React Native app for real-time technician tracking. Node.js/TypeScript, PostgreSQL, React; deployed via Docker on Fly.io.',
		startDate: '2025-01',
		endDate: null,
		priority: 1
	}, {
		name: 'Piggly',
		description: 'Personal-finance SaaS for expense tracking, budgeting, and financial planning. Solo project: TypeScript, Node.js, React, Next.js.',
		startDate: '2026-05',
		endDate: null
	}, {
		name: 'PaaS — Cloud Infrastructure Platform',
		description: 'Platform-as-a-Service for managing cloud infrastructure across self-registered VPS over SSH — application deploy, monitoring, and scaling. 3-person team. TypeScript, Node.js, React, Vite.',
		startDate: '2026-03',
		endDate: null
	}],
	education: [{
		degree: "Bachelor's in Computer Engineering (in progress, expected 2026; transferred from EEP)",
		school: 'Universidade Anhembi Morumbi',
		startDate: '2024-12'
	}],
	certifications: [{
		title: 'Software Engineer',
		issuer: 'HackerRank',
		date: '2024-12-22',
		href: 'https://www.hackerrank.com/certificates/b3237496e821'
	}, {
		title: 'React Foundations',
		issuer: 'Vercel',
		date: '2025-01-19',
		href: 'https://nextjs.org/learn/certificate?course=react-foundations&user=1291&certId=react-foundations-1291-1758939839436'
	}, {
		title: 'Node.js Fundamentals',
		issuer: 'Rocketseat',
		date: '2024-12-01',
		href: 'https://app.rocketseat.com.br/certificates/d4495f8c-e929-4782-b641-70a2cbc00998'
	}],
	languages: [{
		label: 'Portuguese',
		level: 'Native'
	}, {
		label: 'English',
		level: 'Professional working proficiency'
	}]
}


interface StartDate {
	startDate: ISODate
}

interface DurationRange {
	startDate: ISODate
	endDate: ISODate | null
}

function byStartDateDesc(a: StartDate, b: StartDate) {
	return b.startDate.localeCompare(a.startDate)
}

function byEndDateDesc(a: DurationRange, b: DurationRange) {
	a.endDate ??= '9999'
	b.endDate ??= '9999'
	return b.endDate.localeCompare(a.endDate) || b.startDate.localeCompare(a.startDate)
}

export function expDates(exp: Experience): DurationRange {
	if (exp.roles && exp.roles.length > 0) {
		const startDate = exp.roles.map(r => r.startDate).reduce((a, b) => a < b ? a : b)
		const endDates = exp.roles.map(r => r.endDate)
		const endDate = endDates.includes(null) ? null : endDates.reduce((a, b) => (a! > b! ? a : b))!
		return { startDate, endDate }
	}
	return { startDate: exp.startDate!, endDate: exp.endDate ?? null }
}

export const sortedCertifications = [...cv.certifications].sort((a, b) => b.date.localeCompare(a.date))
export const sortedEducation = [...cv.education].sort(byStartDateDesc)
export const sortedExperiences = [...cv.experiences].sort((a, b) => byEndDateDesc(expDates(a), expDates(b)))
export const sortedProjects = [...cv.projects].sort((a, b) => {
	a.priority ??= 0
	b.priority ??= 0
	const byPriority = b.priority - a.priority
	if (byPriority !== 0) return byPriority
	if (!a.startDate && !b.startDate) return 0
	if (!a.startDate) return 1
	if (!b.startDate) return -1
	return b.startDate.localeCompare(a.startDate)
})
