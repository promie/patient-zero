import transform from '../transform'
import {
  IGetPatientInfoQueryResult,
  IPatientResponse,
} from '../../types/patient'

describe('transform()', () => {
  it('returns an empty object an an empty response query results is passed in', () => {
    const input: IGetPatientInfoQueryResult[] = []
    const result = {}

    expect(transform(input)).toEqual(result)
  })

  it('transforms the data in the the correct shape', () => {
    const input: IGetPatientInfoQueryResult[] = [
      {
        answer: '1990-01-01',
        shortCode: 'dob',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'John',
        shortCode: 'firstName',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Smith',
        shortCode: 'lastName',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Eggs',
        shortCode: 'allergies',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Prinivil',
        shortCode: 'medications',
        completedAt: '2021-06-04 03:00:00',
      },
    ]

    const result: IPatientResponse = {
      dob: '1990-01-01',
      firstName: 'John',
      lastName: 'Smith',
      allergies: 'Eggs',
      medications: 'Prinivil',
    }

    expect(transform(input)).toEqual(result)
  })

  it(
    'transforms and sorts the data with the most up to date information for the client who has 2 responses ' +
      '(latest date objects on top)',
    () => {
      const input: IGetPatientInfoQueryResult[] = [
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'Eggs',
          shortCode: 'allergies',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'Prinivil',
          shortCode: 'medications',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'allergies',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'medications',
          completedAt: '2021-02-04 03:00:00',
        },
      ]

      const result: IPatientResponse = {
        dob: '1990-01-01',
        firstName: 'John',
        lastName: 'Smith',
        allergies: 'Eggs',
        medications: 'Prinivil',
      }

      expect(transform(input)).toEqual(result)
    },
  )

  it(
    'transforms and sorts the data with the most up to date information for the client who has multiple responses ' +
      '(latest date objects in the middle)',
    () => {
      const input: IGetPatientInfoQueryResult[] = [
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'allergies',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'medications',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Tofu',
          shortCode: 'allergies',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Asparin',
          shortCode: 'medications',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '',
          shortCode: 'allergies',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '',
          shortCode: 'medications',
          completedAt: '2021-06-04 03:00:00',
        },
      ]

      const result: IPatientResponse = {
        dob: '1990-01-01',
        firstName: 'John',
        lastName: 'Smith',
        allergies: 'Tofu',
        medications: 'Asparin',
      }

      expect(transform(input)).toEqual(result)
    },
  )

  it(
    'transforms and sorts the data with the most up to date information for the client who has multiple responses ' +
      '(latest date objects down the bottom)',
    () => {
      const input: IGetPatientInfoQueryResult[] = [
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'allergies',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: 'NO',
          shortCode: 'medications',
          completedAt: '2021-02-04 03:00:00',
        },
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '',
          shortCode: 'allergies',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '',
          shortCode: 'medications',
          completedAt: '2021-06-04 03:00:00',
        },
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Tofu',
          shortCode: 'allergies',
          completedAt: '2021-08-04 03:00:00',
        },
        {
          answer: 'Asparin',
          shortCode: 'medications',
          completedAt: '2021-08-04 03:00:00',
        },
      ]

      const result: IPatientResponse = {
        dob: '1990-01-01',
        firstName: 'John',
        lastName: 'Smith',
        allergies: 'Tofu',
        medications: 'Asparin',
      }

      expect(transform(input)).toEqual(result)
    },
  )

  it(
    'transforms and sorts the data with the most up to date information for the client who has multiple responses ' +
      '(with the latest dates multiple positions within the object)',
    () => {
      const input: IGetPatientInfoQueryResult[] = [
        {
          answer: '1990-01-01',
          shortCode: 'dob',
          completedAt: '2021-12-04 03:00:00',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: 'Smith',
          shortCode: 'lastName',
          completedAt: '2021-12-04 03:00:00',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: 'John',
          shortCode: 'firstName',
          completedAt: '2021-12-04 03:00:00',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: 'Bananas',
          shortCode: 'allergies',
          completedAt: '2021-12-04 03:00:00',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: '',
          shortCode: '',
          completedAt: '',
        },
        {
          answer: 'Asparin',
          shortCode: 'medications',
          completedAt: '2021-12-04 03:00:00',
        },
      ]

      const result: IPatientResponse = {
        dob: '1990-01-01',
        firstName: 'John',
        lastName: 'Smith',
        allergies: 'Bananas',
        medications: 'Asparin',
      }

      expect(transform(input)).toEqual(result)
    },
  )

  it('transforms, sorts the data with the most up to date information and return all the fields', () => {
    const input: IGetPatientInfoQueryResult[] = [
      {
        answer: '1990-01-01',
        shortCode: 'dob',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'John',
        shortCode: 'firstName',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Smith',
        shortCode: 'lastName',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Eggs',
        shortCode: 'allergies',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Prinivil',
        shortCode: 'medications',
        completedAt: '2021-06-04 03:00:00',
      },
      {
        answer: 'Single',
        shortCode: 'martitalStatus',
        completedAt: '2021-06-04 03:00:00',
      },
    ]

    const result = {
      dob: '1990-01-01',
      firstName: 'John',
      lastName: 'Smith',
      allergies: 'Eggs',
      medications: 'Prinivil',
      martitalStatus: 'Single',
    }

    expect(transform(input)).toEqual(result)
  })
})
