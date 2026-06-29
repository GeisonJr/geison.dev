import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

function safeSrc(key: string, values: Array<boolean | string>): string {
	const src = values
		.filter((value): value is string => {
			return typeof value === 'string'
		})
		.map(value => {
			value = value.trim()

			const quotedKeys = [
				'self',
				'unsafe-eval',
				'unsafe-inline'
			]

			if (quotedKeys.includes(value)) {
				return `'${value}'`
			}

			return value
		})
		.join(' ')

	return `${key} ${src}`
}

const defaultSrc = safeSrc('default-src', [
	'self'
])

const connectSrc = safeSrc('connect-src', [
	'self',
	isDev && 'ws:',
	// Cloudflare (o proxy ainda não está sendo utilizado)
	// !isDev && 'https://cloudflareinsights.com'
])

const fontSrc = safeSrc('font-src', [
	'self'
])

const imgSrc = safeSrc('img-src', [
	'self',
	'data:',
	// Discord
	'https://cdn.discordapp.com',
	// Gravatar
	'https://gravatar.com',
	'https://secure.gravatar.com'
])

const scriptSrc = safeSrc('script-src', [
	'self',
	'unsafe-inline',
	isDev && 'unsafe-eval',
	// Cloudflare (o proxy ainda não está sendo utilizado)
	// !isDev && 'https://static.cloudflareinsights.com'
])

const styleSrc = safeSrc('style-src', [
	'self',
	'unsafe-inline'
])

const contentSecurityPolicy = [
	defaultSrc,
	connectSrc,
	fontSrc,
	imgSrc,
	scriptSrc,
	styleSrc,
	`frame-src 'none'`,
	`object-src 'none'`,
	`base-uri 'self'`,
	`form-action 'self'`,
	`frame-ancestors 'none'`,
	`upgrade-insecure-requests`,
].join('; ')

const nextConfig: NextConfig = {
	compiler: {
		define: {
			__DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
		}
	},
	env: {
		// URLs
		API_URL: process.env.API_URL,
	},
	eslint: {
		ignoreDuringBuilds: true
	},
	async headers() {
		return [{
			source: '/(.*)',
			headers: [{
				key: 'X-Content-Type-Options',
				value: 'nosniff'
			}, {
				key: 'X-Frame-Options',
				value: 'DENY'
			}, {
				key: 'Content-Security-Policy',
				value: contentSecurityPolicy
			}, {
				key: 'Permissions-Policy',
				value: 'geolocation=(), camera=(), microphone=()'
			}, {
				key: 'Referrer-Policy',
				value: 'no-referrer'
			}]
		}]
	},
	output: 'standalone'
}

export default nextConfig
