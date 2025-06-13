interface RequestOptions
  extends Omit<RequestInit, 'body'> {
  body?: BodyInit | object
  query?: object
}

export type {
  RequestOptions
}

