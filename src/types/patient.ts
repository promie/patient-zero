export interface IPatientResponse {
  dob: string | Date
  firstName: string
  lastName: string
  allergies: string
  medications: string
}

export interface IGetPatientInfoQueryResult {
  answer: string | Date
  shortCode: string
  completedAt: string | Date
}
