import { IGetPatientInfoQueryResult } from '../types/patient'

const transform = (results: IGetPatientInfoQueryResult[] | any) => {
  // Get the latest CompletedAtDate
  const latestCompletedAtDate = results?.sort(
    (a: string, b: string): string => {
      // @ts-ignore
      return new Date(b.completedAt) - new Date(a.completedAt)
    },
  )?.[0]?.completedAt

  // filter out the results object with the latestCompletedAtDate
  const newResults = results?.filter(
    (result: IGetPatientInfoQueryResult) =>
      result.completedAt === latestCompletedAtDate,
  )

  return Object.fromEntries(
    newResults.map(
      (result: IGetPatientInfoQueryResult): [string, string | Date] => [
        result.shortCode,
        result.answer,
      ],
    ),
  )
}

export default transform
