'use strict'

import Express from 'express'
import { Header, watchTower } from '../helpers'
import { OTPController } from '../controllers'
import { SendResponse } from '../../lib'

const { sendResponse } = SendResponse
const { checkOTPHeaders } = Header
const OTPRouter = new Express.Router()

OTPRouter.use(checkOTPHeaders)
// Route exporuse to Create Token
OTPRouter.get('/', watchTower(OTPController.create))

// Send Response
OTPRouter.use(sendResponse)

export { OTPRouter }
