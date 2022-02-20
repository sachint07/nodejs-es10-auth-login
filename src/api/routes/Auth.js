'use strict'

import Express from 'express'
import { Header, watchTower } from '../helpers'
import { AuthController } from '../controllers'
import { SendResponse } from '../../lib'

const { sendResponse } = SendResponse
const { checkAuthHeaders } = Header
const AuthRouter = new Express.Router()

// Validating Headers
AuthRouter.use(checkAuthHeaders)
// Route exporuse to Create Token
AuthRouter.post('/', watchTower(AuthController.create))
// Route exporuse to Verify Token
AuthRouter.get('/', watchTower(AuthController.verify))

// Send Response
AuthRouter.use(sendResponse)

export { AuthRouter }
