import type { Axios } from 'axios'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_URL_SERVER

export class Response {
  public httpCode: number

  constructor(httpCode: number) {
    this.httpCode = httpCode
  }
}

export class ServerResponse extends Response {
  public data: any

  constructor(httpCode: number, data: any) {
    super(httpCode)
    this.data = data
  }
}

export class ServerError extends Response {
  error: any

  constructor(httpCode: number, error: any) {
    super(httpCode)
    this.error = error
  }
}

export class ExceptionResponse extends Response {
  detail: string | undefined
  code: string | undefined

  constructor(httpCode: number, detail: string | undefined, code: string | undefined) {
    super(httpCode)
    this.detail = detail
    this.code = code
  }
}

export class PaginateResponse<T> extends Response {
  httpCode = 200
  count: number
  next: string | undefined
  previous: string | undefined
  current_page: number
  total_pages: number
  results: T[]

  constructor(count: number, next: string | undefined, previous: string | undefined, current_page: number, total_pages: number, results: T[]) {
    super(200)
    this.count = count
    this.next = next
    this.previous = previous
    this.current_page = current_page
    this.total_pages = total_pages
    this.results = results
  }
}

const headers = axios.defaults.headers
// headers.common["Access-Control-Allow-Origin"] = "*"
// headers.common["Content-Type"] = "application/json"
// headers.common["Access-Control-Request-Method"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS"
// headers.common["Access-Control-Allow-Headers"] = "*"

const axiosWithToken = {
  ...axios.create({
    baseURL: SERVER_URL,
    headers,
  }),
}
const axiosWithOutToken = axios.create({
  baseURL: SERVER_URL,
  headers,
})
const axiosMultipartData = axios.create({
  baseURL: SERVER_URL,
  headers,
})

export function CallWithToken(): Axios {
  const token = JSON.parse(localStorage.getItem('auth')).token
  const headers_token = Object.create(headers)
  headers_token.common.Authorization = `Bearer ${token}`
  axiosWithToken.defaults.headers = headers_token
  return axiosWithToken
}
export function CallWithoutToken(): Axios {
  return axiosWithOutToken
}

export function SerializeResponse(httpCode: number, data: any): ServerResponse {
  return new ServerResponse(httpCode, data)
}

export async function ParseResponse(promesa): Response {
  let api_response: ServerResponse | ServerError
  await promesa.then((response: any) => {
    api_response = new ServerResponse(response.status, response.data)
  }).catch((error: any) => {
    if (!error.response) {
      api_response = new ServerError(error.status, error.toJSON())
    }
    else {
      error = error.response
      api_response = new ServerResponse(error.status, error.data)
    }
  })
  return api_response
}
