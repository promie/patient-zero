import PatientRepository from '../repositories/PatientRepository'
import { IPatientResponse } from '../types/patient'

/**
 *  Retrieving the most up-to-date information in the response
 *  from the patients questionnaire.
 *
 * @param {number} patientId
 * @returns IPatientResponse[] | {} | undefined
 */
const getPatientInfo = (
  patientId: number,
): Promise<IPatientResponse | {} | undefined> => {
  return PatientRepository.getPatientInfo(patientId)
}

/**
 *  Returning whether or not the patients id exists in the database
 *
 * @param {number} patientId
 * @returns Promise<boolean> | undefined
 */
const doesPatientExist = async (
  patientId: number,
): Promise<boolean | undefined> => {
  return PatientRepository.doesPatientExist(patientId)
}

export default {
  getPatientInfo,
  doesPatientExist,
}
