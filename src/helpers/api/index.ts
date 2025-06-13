import type { RequestOptions } from './types'

function isBlob(value: unknown): value is Blob {
	return value instanceof Blob
}

function isFormData(value: unknown): value is FormData {
	return value instanceof FormData
}

class API {
	private _baseUrl: URL

	constructor(baseUrl: string | URL) {
		this._baseUrl = this.resolveBaseUrl(baseUrl)
	}

	private resolveBaseUrl(baseUrl: string | URL): URL {
		if (!URL.canParse(baseUrl)) {
			throw new Error(`Invalid base URL: ${baseUrl}`)
		}

		return new URL(baseUrl)
	}

	private async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {

		const {
			headers: headersFromOptions,
			body: bodyFromOptions,
			query: queryFromOptions = {},
			...rest
		} = options ?? {}

		const url = new URL(endpoint, this._baseUrl)

		for (const [key, value] of Object.entries(queryFromOptions)) {
			url.searchParams.append(key, String(value))
		}

		const headers = new Headers(headersFromOptions)
		let body: BodyInit | undefined
		if (isBlob(bodyFromOptions)) {
			headers.delete('Content-Type')
			body = bodyFromOptions
		} else if (isFormData(bodyFromOptions)) {
			headers.delete('Content-Type')
			body = bodyFromOptions
		} else {
			headers.set('Content-Type', 'application/json')
			body = JSON.stringify(bodyFromOptions)
		}

		const response = await fetch(url, {
			...rest,
			headers,
			body
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return response.json() as Promise<T>
	}

	public delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) {
		return this.request<T>(endpoint, {
			...options,
			method: 'DELETE'
		})
	}

	public get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
		return this.request<T>(endpoint, {
			...options,
			method: 'GET'
		})
	}

	public patch<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) {
		return this.request<T>(endpoint, {
			...options,
			method: 'PATCH'
		})
	}

	public post<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) {
		return this.request<T>(endpoint, {
			...options,
			method: 'POST'
		})
	}

	public put<T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) {
		return this.request<T>(endpoint, {
			...options,
			method: 'PUT'
		})
	}
}

// const api = new API(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api/')
// const github = new API('https://api.github.com/')

export {
	API
}

