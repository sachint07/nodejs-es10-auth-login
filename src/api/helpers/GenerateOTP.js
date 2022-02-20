'use strict'

// 4 Digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000)

export { generateOTP }
