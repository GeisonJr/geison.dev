import { baseUrl } from '@/helpers'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()

	return [{
		url: baseUrl.toString(),
		lastModified,
		changeFrequency: 'monthly',
		priority: 1
	}, {
		url: new URL('/security/policy.html', baseUrl).toString(),
		lastModified,
		changeFrequency: 'yearly',
		priority: 0.5
	}, {
		url: new URL('/security/acknowledgments.html', baseUrl).toString(),
		lastModified,
		changeFrequency: 'yearly',
		priority: 0.5
	}]
}
