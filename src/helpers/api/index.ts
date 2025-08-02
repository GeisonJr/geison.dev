import type {
	RequestOptions,
	RequestWithoutBodyAndMethod,
	RequestWithoutMethod,
	TBody,
	TBodyInit,
	THeaders,
	THeadersInit,
	TQuery,
	TQueryInit,
	TURL,
	TURLInit
} from './types'

function isBlob(value: unknown): value is Blob {
	return value instanceof Blob
}

function isFormData(value: unknown): value is FormData {
	return value instanceof FormData
}
class API {
	private baseUrl: TURL
	private url: TURL | null = null
	private baseHeaders: THeaders
	private headers: THeaders | null = null
	private query: TQuery | null = null
	private body: TBody | null = null

	constructor(
		baseUrl: TURLInit,
		options?: {
			headers?: THeadersInit
		}
	) {
		this.baseUrl = this.resolveBaseUrl(baseUrl)
		this.baseHeaders = this.resolveHeaders(options?.headers)
	}

	private resolveBaseUrl(baseUrl: TURLInit): TURL {
		return new URL(baseUrl)
	}

	private resolveHeaders(headers?: THeadersInit): THeaders {
		return new Headers(headers)
	}

	private prepareHeaders(headers?: THeadersInit) {
		this.headers = new Headers()

		// Copy base headers
		for (const [key, value] of this.baseHeaders.entries()) {
			this.headers.set(key, value)
		}

		// Copy headers from request
		const newHeaders = new Headers(headers)
		for (const [key, value] of newHeaders.entries()) {
			this.headers.set(key, value)
		}
	}

	private prepareQuery(query?: TQueryInit) {
		this.query = new URLSearchParams()

		// Copy base query
		// ...

		// Copy query from request
		const newQuery = new URLSearchParams(query)
		for (const [key, value] of newQuery.entries()) {
			this.query.set(key, value)
		}
	}

	private prepareBody(body?: TBodyInit) {
		if (isBlob(body)) {
			this.headers!.delete('Content-Type')
			this.body = body
		} else if (isFormData(body)) {
			this.headers!.delete('Content-Type')
			this.body = body
		} else {
			if (!this.headers!.has('Content-Type')) {
				this.headers!.set('Content-Type', 'application/json')
			}
			this.body = JSON.stringify(body)
		}
	}

	private prepareUrl(url: string) {
		if (url.startsWith('/')) {
			url = url.slice(1)
		}

		this.url = new URL(url, this.baseUrl)

		if (this.query instanceof URLSearchParams) {
			this.url.search = this.query.toString()
		}
	}

	private async request<T>(url: string, options?: RequestOptions): Promise<T> {

		const {
			headers: headersFromOptions,
			query: queryFromOptions,
			body: bodyFromOptions,
			...rest
		} = options ?? {}

		this.prepareHeaders(headersFromOptions)
		this.prepareQuery(queryFromOptions)
		this.prepareBody(bodyFromOptions)
		this.prepareUrl(url)

		// await new Promise(resolve => setTimeout(resolve, 5000)) // Simulate delay for debugging

		const response = await fetch(this.url!, {
			...rest,
			headers: this.headers!,
			body: this.body!
		})

		if (!response.ok) {
			throw new Error(await response.text())
		}

		return response.json() as Promise<T>
	}

	public delete<T>(
		url: string,
		options?: RequestWithoutMethod
	) {
		return this.request<T>(url, {
			...options,
			method: 'DELETE'
		})
	}

	public get<T>(
		url: string,
		options?: RequestWithoutBodyAndMethod
	) {
		return this.request<T>(url, {
			...options,
			method: 'GET'
		})
	}

	public patch<T>(
		url: string,
		options?: RequestWithoutMethod
	) {
		return this.request<T>(url, {
			...options,
			method: 'PATCH'
		})
	}

	public post<T>(
		url: string,
		options?: RequestWithoutMethod
	) {
		return this.request<T>(url, {
			...options,
			method: 'POST'
		})
	}

	public put<T>(
		url: string,
		options?: RequestWithoutMethod
	) {
		return this.request<T>(url, {
			...options,
			method: 'PUT'
		})
	}
}

function api() {
	const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/'
	if (!API_URL) {
		throw new Error('The env "NEXT_PUBLIC_API_URL" is not set')
	}

	return new API(API_URL, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}

function discord() {
	const API_URL = 'https://discord.com/api/v10/'
	const API_KEY = process.env.DISCORD_API_KEY ?? ''
	if (!API_KEY) {
		throw new Error('The env "DISCORD_API_KEY" is not set')
	}

	return new API(API_URL, {
		headers: {
			'Authorization': `Bot ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

function github() {
	const API_URL = 'https://api.github.com/'
	const API_KEY = process.env.GITHUB_API_KEY ?? ''
	if (!API_KEY) {
		throw new Error('The env "GITHUB_API_KEY" is not set')
	}

	return new API(API_URL, {
		headers: {
			'Authorization': `Bearer ${API_KEY}`
		}
	})
}

function gravatar() {
	const API_URL = 'https://api.gravatar.com/v3/'
	const API_KEY = process.env.GRAVATAR_API_KEY ?? ''
	if (!API_KEY) {
		throw new Error('The env "GRAVATAR_API_KEY" is not set')
	}

	return new API(API_URL, {
		headers: {
			'Authorization': `Bearer ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

function wakatime() {
	const API_URL = 'https://api.wakatime.com/api/v1/'
	const API_KEY = process.env.WAKATIME_API_KEY ?? ''
	if (!API_KEY) {
		throw new Error('The env "WAKATIME_API_KEY" is not set')
	}

	return new API(API_URL, {
		headers: {
			'Authorization': `Basic ${API_KEY}`,
			'Content-Type': 'application/json'
		}
	})
}

export {
	API,
	api,
	discord,
	github,
	gravatar,
	wakatime
}

