import request from 'supertest'
import httpStatus from 'http-status'
import app from './app'

describe('GET /api/v1/patients/:id', () => {
  it('returns the 200 OK when the patient info is successfully retrieved', async () => {
    await request(app).get('/api/v1/patients/1').expect(httpStatus.OK)
  })

  it('returns success true when the patient info is successfully retrieved', async () => {
    const response = await request(app).get('/api/v1/patients/1')

    expect(response.body.success).toBe(true)
  })

  it('returns the correct payload when the patient info is successfully retrived', async () => {
    const response = await request(app).get('/api/v1/patients/1')

    expect(response.body.patient).toEqual({
      dob: '1990-01-01',
      firstName: 'John',
      lastName: 'Smith',
      allergies: 'Eggs',
      medications: 'Prinivil',
    })
  })

  it(
    'returns an empty patient object if a patient id is found in the database but the patient has yet to ' +
      'submit their questionnaires (no completedAt date)',
    async () => {
      const response = await request(app).get('/api/v1/patients/3')

      expect(response.body).toEqual({ success: true, patient: {} })
    },
  )

  it('returns a 404 NOT FOUND if an invalid patient id is passed in (id that is not in the database)', async () => {
    await request(app).get('/api/v1/patients/1000').expect(httpStatus.NOT_FOUND)
  })

  it('returns a 404 NOT FOUND if an invalid character is passed as in as an id', async () => {
    await request(app)
      .get('/api/v1/patients/TEXTSHOULDNOTWORK')
      .expect(httpStatus.NOT_FOUND)
  })

  it('returns a message with success false if an invalid patient id is passed in)', async () => {
    const response = await request(app).get('/api/v1/patients/1000')

    expect(response.body).toEqual({
      success: false,
      message: 'Patient id: 1000 does not exist.',
    })
  })
})
