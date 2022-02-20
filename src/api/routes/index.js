'use strict'

import packageJSON from '../../../package.json'
import { ResponseBody } from '../../lib'
import { AuthRouter } from './Auth'
import { OTPRouter } from './OTP'

const { version } = packageJSON

const Routes = [
  { path: '/auth', router: AuthRouter },
  { path: '/otp', router: OTPRouter }
]
Routes.init = (app) => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  Routes.forEach(route => app.use(route.path, route.router))

  // Health Check API
  app.get('/version', (request, response, next) => {
    const data = { version }
    const responseBody = new ResponseBody(200, 'Success', data)
    response.status(responseBody.statusCode).json(responseBody)
  })
  // Health Check API
  app.get('/health-check', (request, response, next) => {
    const responseBody = new ResponseBody(200, 'Success')
    response.status(responseBody.statusCode).json(responseBody)
  })
  // Unknow Routes
  app.use('*', (request, response, next) => {
    const error = {
      statusCode: 404,
      message: ['Cannot', request.method, request.originalUrl].join(' ')
    }
    next(error)
  })

  app.use((error, request, response, next) => {
    if (!error) { return }

    if (error.statusCode) {
      response.statusMessage = error.message
      return response.status(error.statusCode).json(error)
    }

    const err = {
      statusCode: 500,
      message: error.toString()
    }
    response.statusMessage = err.message
    return response.status(err.statusCode).json(err)
  })
}

export default Routes
