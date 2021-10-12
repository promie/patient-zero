# Patient Zero
Patient Zero is an API service that retrieves the latest information on a single patient. This app is written in
Node, Express (TypeScript), Sqlite3 and Jest.

## Design
The structure of the application uses the **Service Pattern**. This pattern makes up of the repository,
service and controller layers. The repository layer defines the database query; The service layer defines the business
logic and the controller layer defines the Web API. With this structure the API can be extended further to make the app
scalable. As each layer has its own small set of functions, it makes the code clean and more modular. This also
makes unit testing simple.

## Requirements
- Node 14.17.6 LTS
- NPM 6.x

## Installation
```bash
npm install
```

## How to run
### Local
To run the app, run the below command in the root directory:
```bash
npm run start
```

You can also run the app in development/watch mode. Again, in the root directory:
```bash
npm run dev
```

An express server will spin up on `http://localhost:5000/` and from there you can hit the GET endpoint
by passing in patient id to `/api/v1/patients/:id`.

The endpoint can be tested with [postman](https://www.postman.com/) or [insomnia](https://insomnia.rest/).

## How to run tests
Run all tests (both unit and integration)
```bash
npm run test
```

Run unit tests
```bash
npm run test:unit
```

Run integration tests
```bash
npm run test:integration
```