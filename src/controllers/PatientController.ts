import { Request, Response, NextFunction } from 'express'
import { PatientService } from '../services'
import httpStatus = require('http-status')
import { catchAsync } from '../utils'

/**
 *  Retrieving a single patient the most up-to-date information
 *
 * @param {object} req
 * @param {object} res
 * @param {function} _next
 * @returns IPatientResponse
 */
const getPatientInfo = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const patientId = parseInt(req.params.id, 10)

    const patientExist = await PatientService.doesPatientExist(patientId)

    if (!patientExist) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: `Patient id: ${patientId} does not exist.`,
      })
    }

    const patient = await PatientService.getPatientInfo(patientId)

    return res.status(httpStatus.OK).json({
      success: true,
      patient,
    })
  },
)

export default {
  getPatientInfo,
}
