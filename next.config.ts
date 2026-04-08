import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com'
			}
		]
	}
}

export default nextConfig
