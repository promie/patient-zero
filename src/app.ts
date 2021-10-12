import express, { Application } from 'express'
import cors from 'cors'
import { PatientRoute } from './routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/patients', PatientRoute)

export default app
