import sqlite3 from 'sqlite3'
import { ISqlite, open } from 'sqlite'

const initialiseDb = () => {
  const dbFile =
    process.env.NODE_ENV === 'test' ? 'integration.db' : 'questionnaire.db'

  return open({
    filename: dbFile,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY,
  })
}

const runDBQuery = async (
  query: ISqlite.SqlType,
  ...params: any[]
): Promise<string[]> => {
  const db = await initialiseDb()
  const res = await db.all(query, params)

  await db.close()
  return res
}

export { runDBQuery }
