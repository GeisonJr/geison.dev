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
	safeSrc('default-src', [
		'self'
	]),
	safeSrc('connect-src', [
		'self',
		isDev && 'ws:',
		// Cloudflare (o proxy ainda não está sendo utilizado)
		// !isDev && 'https://cloudflareinsights.com'
	]),
	safeSrc('font-src', [
		'self'
	]),
	safeSrc('frame-src', [
		'none'
	]),
	safeSrc('img-src', [
		'self',
		'data:',
		// Discord
		'https://cdn.discordapp.com',
		// Gravatar
		'https://gravatar.com',
		'https://secure.gravatar.com'
	]),
	safeSrc('object-src', [
		'none'
	]),
	safeSrc('script-src', [
		'self',
		'unsafe-inline',
		isDev && 'unsafe-eval',
		// Cloudflare (o proxy ainda não está sendo utilizado)
		// !isDev && 'https://static.cloudflareinsights.com'
	]),
	safeSrc('style-src', [
		'self',
		'unsafe-inline'
	]),
	safeSrc('worker-src', [
		'self'
	]),
	safeSrc('base-uri', [
		'self'
	]),
	safeSrc('form-action', [
		'self'
	]),
	safeSrc('frame-ancestors', [
		'none'
	]),
	'upgrade-insecure-requests'
].join('; ')

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
