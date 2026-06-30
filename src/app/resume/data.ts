/** ISO 8601 subset: YYYY | YYYY-MM | YYYY-MM-DD | YYYY-MM-DDTHH:MM:SSZ */
export type ISODate = string

/** Supported résumé languages. English is the default. */
export type Lang = 'en' | 'pt'

/** A string that exists in both languages. */
type L = Record<Lang, string>

/**
 * The résumé is generic over its text type: `L` in the source (both languages),
 * `string` once resolved for a chosen language. Fields that don't translate —
 * dates, hrefs, tech names, proper nouns — stay plain strings in both forms.
 */
interface Contact<T> {
	location: T
	email: string
	phone?: string
	links: Array<{ label: string; href: string }>
}

interface SkillGroup<T> {
	label: T
	items: string[]
}

interface Role<T> {
	title: T
	startDate: ISODate
	endDate: ISODate | null
	bullets?: T[]
}

interface Experience<T> {
	company: string
	startDate?: ISODate
	endDate?: ISODate | null
	location?: T
	summary?: T
	roles?: Array<Role<T>>
}

interface Project<T> {
	name: string
	description: T
	href?: string
	startDate?: ISODate
	endDate?: ISODate | null
	/** Higher value sorts first in Selected Projects; defaults to 0. */
	priority?: number
}

interface Education<T> {
	degree: T
	school: string
	startDate: ISODate
	endDate?: ISODate
}

interface Certification {
	title: string
	speaker?: string
	issuer: string
	date: ISODate
	href?: string
}

interface Language<T> {
	label: T
	level: T
}

interface Resume<T> {
	name: string
	title: T
	headline: T
	contact: Contact<T>
	summary: T
	skills: Array<SkillGroup<T>>
	experiences: Array<Experience<T>>
	projects: Array<Project<T>>
	education: Array<Education<T>>
	certifications: Certification[]
	languages: Array<Language<T>>
}

/** Résumé resolved to a single language — what the page renders. */
export type CV = Resume<string>

const source: Resume<L> = {
	name: 'Geison Oriani',
	title: {
		en: 'Software Development Engineer',
		pt: 'Engenheiro de Software'
	},
	headline: {
		en: 'Back-end · TypeScript · Node.js · GCP · Kubernetes · Distributed Systems',
		pt: 'Back-end · TypeScript · Node.js · GCP · Kubernetes · Sistemas Distribuídos'
	},
	contact: {
		location: {
			en: 'Piracicaba, SP, Brazil',
			pt: 'Piracicaba, SP, Brasil'
		},
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
	summary: {
		en: 'Software Development Engineer with 5+ years building scalable, distributed backend systems in TypeScript and Node.js. At Luizalabs, I owned 12 production services processing ~500K shipments/day on GCP and Kubernetes — full end-to-end ownership, from system design to on-call. Previously grew from intern to Technical Lead at HPro, leading a team of 5.',
		pt: 'Engenheiro de Software com mais de 5 anos construindo sistemas backend escaláveis e distribuídos em TypeScript e Node.js. Na Luizalabs, fui responsável por 12 serviços em produção que processam ~500 mil envios/dia em GCP e Kubernetes — com responsabilidade ponta a ponta, do design de sistemas ao on-call. Anteriormente, evoluí de estagiário a Líder Técnico na HPro, liderando um time de 5 pessoas.'
	},
	skills: [{
		label: { en: 'Languages & Back-end', pt: 'Linguagens & Back-end' },
		items: ['TypeScript', 'JavaScript', 'Node.js', 'NestJS', 'SQL', 'Microservices']
	}, {
		label: { en: 'Architecture', pt: 'Arquitetura' },
		items: ['System Design', 'Distributed Systems', 'Event-Driven Architecture', 'High Availability', 'Scalability']
	}, {
		label: { en: 'Data & Messaging', pt: 'Dados & Mensageria' },
		items: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'Google Pub/Sub', 'BigQuery']
	}, {
		label: { en: 'Cloud, DevOps & Observability', pt: 'Cloud, DevOps & Observabilidade' },
		items: ['GCP', 'AWS', 'Kubernetes', 'Docker', 'ArgoCD', 'CI/CD', 'Linux', 'Datadog', 'Grafana']
	}, {
		label: { en: 'Front-end', pt: 'Front-end' },
		items: ['React.js', 'Next.js', 'React Native']
	}],
	experiences: [{
		company: 'Luizalabs',
		location: { en: 'Remote (Brazil)', pt: 'Remoto (Brasil)' },
		roles: [{
			title: { en: 'Software Developer', pt: 'Desenvolvedor de Software' },
			startDate: '2025-09',
			endDate: '2026-06',
			bullets: [{
				en: 'Owned end-to-end (system design → deployment → on-call) 12 production services (5 APIs, 2 BFFs, 3 workers, 2 frontends) in TypeScript/Node.js for the shipping and carrier integration domain — covering postage, Correios API, carrier integrations, and label generation, processing ~500K shipments per day — deployed on GCP and MGC (Magalu Cloud) via Kubernetes and ArgoCD.',
				pt: 'Responsável ponta a ponta (design de sistemas → deploy → on-call) por 12 serviços em produção (5 APIs, 2 BFFs, 3 workers, 2 frontends) em TypeScript/Node.js no domínio de envios e integração com transportadoras — cobrindo postagem, API dos Correios, integrações com transportadoras e geração de etiquetas, processando ~500 mil envios por dia — implantados em GCP e MGC (Magalu Cloud) via Kubernetes e ArgoCD.'
			}, {
				en: 'Collaborated with a team of 6 engineers, shipping ~4 production deploys per week using GitLab CI/CD and ArgoCD (GitOps) under Agile/Kanban workflows.',
				pt: 'Colaborei com um time de 6 engenheiros, realizando ~4 deploys em produção por semana com GitLab CI/CD e ArgoCD (GitOps) sob fluxos Ágil/Kanban.'
			}, {
				en: 'Designed event-driven workflows with RabbitMQ and Google Pub/Sub, powering a notification system that reacts to domain events (replication events, label availability, payment approval, and invoice issuance), with Redis for caching and shipment state.',
				pt: 'Projetei fluxos orientados a eventos com RabbitMQ e Google Pub/Sub, alimentando um sistema de notificações que reage a eventos de domínio (eventos de replicação, disponibilidade de etiqueta, aprovação de pagamento e emissão de nota fiscal), com Redis para cache e estado dos envios.'
			}, {
				en: 'Instrumented services with Datadog and Grafana for error tracking, performance, and infrastructure monitoring, with alerting across all production services.',
				pt: 'Instrumentei os serviços com Datadog e Grafana para rastreamento de erros, performance e monitoramento de infraestrutura, com alertas em todos os serviços em produção.'
			}, {
				en: 'Queried logistics data in Google BigQuery for operational metrics and carrier performance reporting; wrote unit and integration tests with Jest and conducted code reviews to enforce quality standards.',
				pt: 'Consultei dados logísticos no Google BigQuery para métricas operacionais e relatórios de desempenho de transportadoras; escrevi testes unitários e de integração com Jest e conduzi code reviews para garantir os padrões de qualidade.'
			}]
		}]
	}, {
		company: 'HPro — Soluções de TI para Gestão Corporativa',
		location: { en: 'Piracicaba, SP, Brazil', pt: 'Piracicaba, SP, Brasil' },
		roles: [{
			title: { en: 'Technical Lead', pt: 'Líder Técnico' },
			startDate: '2024-04',
			endDate: '2025-08',
			bullets: [{
				en: 'Led a team of 5 engineers delivering an ERP platform for corporate IT management, owning architecture decisions and sprint planning.',
				pt: 'Liderei um time de 5 engenheiros na entrega de uma plataforma ERP para gestão de TI corporativa, responsável pelas decisões de arquitetura e pelo planejamento das sprints.'
			}, {
				en: 'Drove the web modernization of selected legacy Delphi/Object Pascal modules — remaking them for web and integrating with a new Node.js/TypeScript application for new web and mobile features — while the core backend remained in Delphi, without disrupting ongoing deliveries.',
				pt: 'Conduzi a modernização para web de módulos legados selecionados em Delphi/Object Pascal — recriando-os para web e integrando-os a uma nova aplicação Node.js/TypeScript para novas funcionalidades web e mobile — enquanto o backend principal permanecia em Delphi, sem interromper as entregas em andamento.'
			}, {
				en: 'Designed and delivered a mobile module using React Native (Expo), expanding the ERP to field technicians and mobile users.',
				pt: 'Projetei e entreguei um módulo mobile com React Native (Expo), expandindo o ERP para técnicos de campo e usuários mobile.'
			}, {
				en: 'Established engineering standards (Git branching, PR reviews, Agile/Scrum ceremonies) and mentored junior/mid engineers through pair programming and design reviews, improving delivery predictability.',
				pt: 'Estabeleci padrões de engenharia (estratégia de branches no Git, revisão de PRs, cerimônias Ágil/Scrum) e mentorei engenheiros júnior/pleno por meio de pair programming e revisões de design, melhorando a previsibilidade das entregas.'
			}]
		}, {
			title: { en: 'Senior Software Developer', pt: 'Desenvolvedor de Software Sênior' },
			startDate: '2023-08',
			endDate: '2024-03',
			bullets: [{
				en: 'Designed and implemented full-stack features across Node.js/TypeScript backend, React/React Native frontend, and Delphi/Object Pascal legacy code, integrating with SQL and SQLite databases.',
				pt: 'Projetei e implementei funcionalidades full-stack no backend Node.js/TypeScript, frontend React/React Native e código legado Delphi/Object Pascal, integrando com bancos SQL e SQLite.'
			}, {
				en: 'Owned end-to-end delivery of modules from technical specification through production deployment under Agile/Scrum methodology.',
				pt: 'Fui responsável pela entrega ponta a ponta de módulos, da especificação técnica ao deploy em produção, sob metodologia Ágil/Scrum.'
			}]
		}, {
			title: { en: 'Software Developer', pt: 'Desenvolvedor de Software' },
			startDate: '2022-10',
			endDate: '2023-07'
		}, {
			title: { en: 'Junior Software Developer', pt: 'Desenvolvedor de Software Júnior' },
			startDate: '2021-12',
			endDate: '2022-09'
		}, {
			title: { en: 'Software Development Intern', pt: 'Estagiário de Desenvolvimento de Software' },
			startDate: '2021-06',
			endDate: '2021-11'
		}]
	}, {
		company: 'Grupo Tork',
		location: { en: 'Piracicaba, SP, Brazil', pt: 'Piracicaba, SP, Brasil' },
		roles: [{
			title: { en: 'IT Support Technician', pt: 'Técnico de Suporte de TI' },
			startDate: '2017-01',
			endDate: '2021-05'
		}]
	}],
	projects: [{
		name: 'Tork Track',
		description: {
			en: 'Freelance full-stack field-service platform for Tork Express do Brasil — service-order lifecycle (clients, inventory, scheduling, audit trails, reporting) plus a React Native app for real-time technician tracking. Node.js/TypeScript, PostgreSQL, React; deployed via Docker on Fly.io.',
			pt: 'Plataforma full-stack freelance de gestão de serviços de campo para a Tork Express do Brasil — ciclo de vida da ordem de serviço (clientes, estoque, agendamento, trilhas de auditoria, relatórios) e um app React Native para rastreamento de técnicos em tempo real. Node.js/TypeScript, PostgreSQL, React; implantada via Docker no Fly.io.'
		},
		startDate: '2025-01',
		endDate: null,
		priority: 1
	}, {
		name: 'Piggly',
		description: {
			en: 'Personal-finance SaaS for expense tracking, budgeting, and financial planning. Solo project: TypeScript, Node.js, React, Next.js.',
			pt: 'SaaS de finanças pessoais para controle de gastos, orçamento e planejamento financeiro. Projeto solo: TypeScript, Node.js, React, Next.js.'
		},
		startDate: '2026-05',
		endDate: null
	}, {
		name: 'PaaS — Cloud Infrastructure Platform',
		description: {
			en: 'Platform-as-a-Service for managing cloud infrastructure across self-registered VPS over SSH — application deploy, monitoring, and scaling. 3-person team. TypeScript, Node.js, React, Vite.',
			pt: 'Plataforma como Serviço (PaaS) para gerenciar infraestrutura em nuvem em VPS auto-registrados via SSH — deploy de aplicações, monitoramento e escalabilidade. Time de 3 pessoas. TypeScript, Node.js, React, Vite.'
		},
		startDate: '2026-03',
		endDate: null
	}],
	education: [{
		degree: {
			en: "Bachelor's in Computer Engineering (in progress, expected 2026; transferred from EEP)",
			pt: 'Bacharelado em Engenharia da Computação (em andamento, conclusão prevista para 2026; transferido da EEP)'
		},
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
		label: { en: 'Portuguese', pt: 'Português' },
		level: { en: 'Native', pt: 'Nativo' }
	}, {
		label: { en: 'English', pt: 'Inglês' },
		level: { en: 'Professional working proficiency', pt: 'Proficiência profissional' }
	}]
}

/** Static UI strings (section headings + toolbar), per language. */
export interface Labels {
	back: string
	language: string
	paper: string
	download: string
	print: string
	summary: string
	skills: string
	experience: string
	projects: string
	education: string
	certifications: string
	languages: string
}

const uiLabels: Record<Lang, Labels> = {
	en: {
		back: 'Back',
		language: 'Language',
		paper: 'Paper',
		download: 'Download',
		print: 'Print',
		summary: 'Professional Summary',
		skills: 'Skills',
		experience: 'Professional Experience',
		projects: 'Selected Projects',
		education: 'Education',
		certifications: 'Certifications',
		languages: 'Languages'
	},
	pt: {
		back: 'Voltar',
		language: 'Idioma',
		paper: 'Papel',
		download: 'Baixar',
		print: 'Imprimir',
		summary: 'Resumo Profissional',
		skills: 'Competências',
		experience: 'Experiência Profissional',
		projects: 'Projetos Selecionados',
		education: 'Formação Acadêmica',
		certifications: 'Certificações',
		languages: 'Idiomas'
	}
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

const locales: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' }
const presentLabel: Record<Lang, string> = { en: 'Present', pt: 'Presente' }

function dateOptions(precision: Precision, style: 'short' | 'long'): Intl.DateTimeFormatOptions {
	switch (precision) {
		case 'year': return { year: 'numeric' }
		case 'month': return { month: style === 'long' ? 'long' : 'short', year: 'numeric' }
		case 'day': return { day: '2-digit', month: style === 'long' ? 'long' : 'short', year: 'numeric' }
		case 'time': return { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
	}
}

export function formatDate(iso: ISODate, lang: Lang, style: 'short' | 'long' = 'short'): string {
	const { date, precision } = parseISO(iso)
	return new Intl.DateTimeFormat(locales[lang], dateOptions(precision, style)).format(date)
}

export function formatPeriod(start: ISODate, end: ISODate | null | undefined, lang: Lang, style: 'short' | 'long' = 'short'): string {
	return `${formatDate(start, lang, style)} - ${end ? formatDate(end, lang, style) : presentLabel[lang]}`
}

/** Flatten the bilingual source into a single-language résumé. */
function resolve(src: Resume<L>, lang: Lang): CV {
	return {
		name: src.name,
		title: src.title[lang],
		headline: src.headline[lang],
		contact: { ...src.contact, location: src.contact.location[lang] },
		summary: src.summary[lang],
		skills: src.skills.map(skill => ({ label: skill.label[lang], items: skill.items })),
		experiences: src.experiences.map(exp => ({
			company: exp.company,
			startDate: exp.startDate,
			endDate: exp.endDate,
			location: exp.location?.[lang],
			summary: exp.summary?.[lang],
			roles: exp.roles?.map(role => ({
				title: role.title[lang],
				startDate: role.startDate,
				endDate: role.endDate,
				bullets: role.bullets?.map(bullet => bullet[lang])
			}))
		})),
		projects: src.projects.map(project => ({
			name: project.name,
			description: project.description[lang],
			href: project.href,
			startDate: project.startDate,
			endDate: project.endDate,
			priority: project.priority
		})),
		education: src.education.map(edu => ({
			degree: edu.degree[lang],
			school: edu.school,
			startDate: edu.startDate,
			endDate: edu.endDate
		})),
		certifications: src.certifications,
		languages: src.languages.map(language => ({ label: language.label[lang], level: language.level[lang] }))
	}
}

interface DurationRange {
	startDate: ISODate
	endDate: ISODate | null
}

function byStartDateDesc(a: { startDate: ISODate }, b: { startDate: ISODate }) {
	return b.startDate.localeCompare(a.startDate)
}

function byEndDateDesc(a: DurationRange, b: DurationRange) {
	const endA = a.endDate ?? '9999'
	const endB = b.endDate ?? '9999'
	return endB.localeCompare(endA) || b.startDate.localeCompare(a.startDate)
}

function expDates(exp: CV['experiences'][number]): DurationRange {
	if (exp.roles && exp.roles.length > 0) {
		const startDate = exp.roles.map(r => r.startDate).reduce((a, b) => a < b ? a : b)
		const endDates = exp.roles.map(r => r.endDate)
		const endDate = endDates.includes(null) ? null : endDates.reduce((a, b) => (a! > b! ? a : b))!
		return { startDate, endDate }
	}
	return { startDate: exp.startDate!, endDate: exp.endDate ?? null }
}

export interface Resolved {
	cv: CV
	labels: Labels
	sortedExperiences: CV['experiences']
	sortedProjects: CV['projects']
	sortedEducation: CV['education']
	sortedCertifications: CV['certifications']
}

/** Resolve, sort, and label the résumé for the chosen language. */
export function getResume(lang: Lang): Resolved {
	const cv = resolve(source, lang)
	const sortedExperiences = [...cv.experiences].sort((a, b) => byEndDateDesc(expDates(a), expDates(b)))
	const sortedEducation = [...cv.education].sort(byStartDateDesc)
	const sortedCertifications = [...cv.certifications].sort((a, b) => b.date.localeCompare(a.date))
	const sortedProjects = [...cv.projects].sort((a, b) => {
		const pa = a.priority ?? 0
		const pb = b.priority ?? 0
		if (pb !== pa) return pb - pa
		if (!a.startDate && !b.startDate) return 0
		if (!a.startDate) return 1
		if (!b.startDate) return -1
		return b.startDate.localeCompare(a.startDate)
	})
	return { cv, labels: uiLabels[lang], sortedExperiences, sortedProjects, sortedEducation, sortedCertifications }
}
