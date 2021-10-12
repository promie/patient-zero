import { runDBQuery } from '../config/db'
import transform from '../helpers/transform'
import { IPatientResponse } from '../types/patient'
import { Logger } from '../utils'

/**
 *  Querying the questionnaire database using the patientId
 *  and returning the most up-to-date information in the response
 *
 * @param {number} patientId
 * @returns IPatientResponse[] | {} | undefined
 */
const getPatientInfo = async (
  patientId: number,
): Promise<IPatientResponse | {} | undefined> => {
  try {
    const query = `
               SELECT questionnaire_answer.answer, questionnaire_question.short_code AS shortCode, patient_questionnaire.completed_at AS completedAt
               FROM questionnaire_answer
               INNER JOIN questionnaire_question ON questionnaire_question.id = questionnaire_answer.question_id
               INNER JOIN patient_questionnaire ON patient_questionnaire.id = questionnaire_answer.questionnaire_id
               WHERE patient_questionnaire.patient_id = ? AND patient_questionnaire.completed_at IS NOT NULL
               ORDER BY patient_questionnaire.completed_at DESC
               `
    const results = await runDBQuery(query, patientId)

    return transform(results)
  } catch (err) {
    Logger.error(err.message)
  }
}

/**
 *  Querying the questionnaire database using the patientId
 *  to see whether or not the id exists in the database in the
 *  patient_questionnaire table
 *
 * @param {number} patientId
 * @returns Promise<boolean> | undefined
 */
const doesPatientExist = async (
  patientId: number,
): Promise<boolean | undefined> => {
  try {
    const query = `
                SELECT DISTINCT patient_questionnaire.patient_id 
                FROM patient_questionnaire
                WHERE patient_questionnaire.patient_id = ?
                `

    const result = await runDBQuery(query, patientId)

    return !!result.length
  } catch (err) {
    Logger.error(err.message)
  }
}

export default {
  getPatientInfo,
  doesPatientExist,
}
