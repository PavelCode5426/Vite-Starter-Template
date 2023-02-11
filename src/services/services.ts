import type { Response } from '~/globals/config/axios'
import { CallWithToken, CallWithoutToken, ExceptionResponse, ServerError, ServerResponse } from '~/globals/config/axios'
import {
  checkIsAuthenticateAndRedirect, checkIsAuthorizedAndRedirect, checkIsNotFoundAndRedirect,
  checkServerErrorAndRedirect,
} from '~/helpers/utils'
export class Paginate {
  page = 1
  page_size = 10

  constructor(page = 1, page_size = 10) {
    this.page = page
    this.page_size = page_size
  }

  reset() {
    this.page = 1
  }
}

export class Filter extends Paginate {
  search: string

  constructor(page = 1, page_size = 10, search = '') {
    super(page, page_size)
    this.search = search
  }
}

export default class AbstractService {
  callWithToken() {
    return CallWithToken()
  }

  callWithoutToken() {
    return CallWithoutToken()
  }

  async parseResponse(promesa): Promise<Response> {
    let api_response: Response
    await promesa.then((response: any) => {
      api_response = new ServerResponse(response.status, response.data)
    }).catch((error: any) => {
      api_response = this.manageResponseError(error)
    })
    return api_response
  }

  protected manageResponseError(error): ServerError | ExceptionResponse {
    let response
    if (!error.response) { // INDICA QUE ES UN ERROR DEL SERVIDOR
      response = new ServerError(error.status, error.toJSON())
      response = this.handleServerError(new ServerError(error.status, error.toJSON()))
    }
    else { // ES UNA EXCEPCION DEL BACKEND
      error = error.response
      response = new ExceptionResponse(error.status, error.data.detail, error.data.code)
      response = this.handleExceptionResponse(response)
    }
    if (response instanceof ServerError || response instanceof ExceptionResponse)
      throw response
  }

  protected handleServerError(error: ServerError): ServerError | boolean {
    if (checkServerErrorAndRedirect(error))
      return true
    return error
  }

  protected handleExceptionResponse(response: ExceptionResponse): ExceptionResponse | boolean {
    if (checkIsAuthenticateAndRedirect(response)
        || checkIsAuthorizedAndRedirect(response)
        || checkIsNotFoundAndRedirect(response))
      return true

    return response
  }
}
