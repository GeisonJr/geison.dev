import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

function safeCSP(key: string, values: Array<boolean | string>): string {
	const src = values
		.filter((value): value is string => {
			return typeof value === 'string'
		})
		.map((value) => {
			value = value.trim()

			const quotedKeys = [
				'none',
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

const contentSecurityPolicy = [
	safeCSP('default-src', [
		'self'
	]),
	safeCSP('connect-src', [
		'self',
		isDev && 'ws:',
		// Cloudflare
		!isDev && 'https://cloudflareinsights.com'
	]),
	safeCSP('font-src', [
		'self'
	]),
	safeCSP('frame-src', [
		'none'
	]),
	safeCSP('img-src', [
		'self',
		'data:',
		// Discord
		'https://cdn.discordapp.com',
		// Gravatar
		'https://gravatar.com',
		'https://secure.gravatar.com'
	]),
	safeCSP('object-src', [
		'none'
	]),
	safeCSP('script-src', [
		'self',
		'unsafe-inline',
		isDev && 'unsafe-eval',
		// Cloudflare
		!isDev && 'https://static.cloudflareinsights.com'
	]),
	safeCSP('style-src', [
		'self',
		'unsafe-inline'
	]),
	safeCSP('worker-src', [
		'self'
	]),
	safeCSP('base-uri', [
		'self'
	]),
	safeCSP('form-action', [
		'self'
	]),
	safeCSP('frame-ancestors', [
		'none'
	]),
	'upgrade-insecure-requests'
]
	.join('; ')

const nextConfig: NextConfig = {
	compiler: {
		define: {
			__DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
		}
	},
	env: {
		// URLs
		API_URL: process.env.API_URL
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
				value: 'camera=(), geolocation=(), microphone=()'
			}, {
				key: 'Referrer-Policy',
				value: 'no-referrer'
			}]
		}]
	},
	output: 'standalone'
}

export default nextConfig
