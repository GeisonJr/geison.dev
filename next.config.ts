import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === 'development'

const cspHeader = [
	`default-src 'self'`,
	isDev
		? `connect-src 'self' ws:`
		: `connect-src 'self'`,
	`img-src 'self' data: https://cdn.discordapp.com https://gravatar.com https://*.gravatar.com`,
	`object-src 'none'`,
	isDev
		? `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
		: `script-src 'self' 'unsafe-inline'`,
	`style-src 'self' 'unsafe-inline'`,
	`base-uri 'self'`,
	`form-action 'self'`,
	`frame-ancestors 'none'`,
	`upgrade-insecure-requests`,
].join('; ')

const nextConfig: NextConfig = {
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'Content-Security-Policy',
						value: cspHeader
					},
					{
						key: 'Permissions-Policy',
						value: 'geolocation=(), camera=(), microphone=()'
					},
					{
						key: 'Referrer-Policy',
						value: 'no-referrer'
					}
				]
			}
		]
	}
}

export default nextConfig
