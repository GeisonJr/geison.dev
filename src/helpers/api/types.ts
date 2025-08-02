export type TURLInit = URL | string
export type TURL = URL

export type THeadersInit = HeadersInit
export type THeaders = Headers

export type TBodyInit = BodyInit | object
export type TBody = BodyInit | null

export type TQueryInit = URLSearchParams | Record<string, string>
export type TQuery = URLSearchParams

export type TOptions = {
	headers?: THeadersInit
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
	query?: TQueryInit
	body?: TBodyInit
}

export type RequestWithoutMethod = Omit<RequestOptions, 'method'>
export type RequestWithoutBodyAndMethod = Omit<RequestOptions, 'body' | 'method'>
