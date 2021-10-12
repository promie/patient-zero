import express from 'express'
import { PatientController } from '../controllers'
import createAccountLimiter from '../middlewares/rateLimit'

const router = express.Router()

router.get('/:id(\\d+)', createAccountLimiter, PatientController.getPatientInfo)

export default router
