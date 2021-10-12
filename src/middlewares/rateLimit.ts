import rateLimit from 'express-rate-limit'

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 10 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
})

export default createAccountLimiter
