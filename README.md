# Car-Net
![alt text](https://user-images.githubusercontent.com/94384379/231447402-8e5bf03e-086b-4a29-b3fd-4328348f6dbc.png)
Are you a car enthousiast and have always dreamed of filling up your personal garage with your favorite cars?
Join the Car-Network and start building your own garage!
Add friends and visit their garages!

## School Assignment: 
Avans University | Computer Science | Client-Side Webframeworks

## Tech Stack

**Web:** 
Angular, TailwindCSS, Bootstrap

**Server API, databases:** 
NestJS, MongoDB, Neo4j

**Monorepo:**
NX

## Environment Variables

This project includes .env.example files in both apps: Car-Net and Data-API. 
Add the .env files and add the correct values to the variables

## Run Locally

Clone the project

```bash
  git clone https://github.com/JonahEikenhorst/Car-Net.git
```

Go to the project directory

```bash
  cd Car-Net
```

Install dependencies

```bash
  npm install
```

Start the frontend
```bash
  npm run dev
```

Start the backend

```bash
  npm run dev:data-api
```

Or start both
```bash
  nx serve
```

## Running Tests

To run tests for the frontend, run the following command

```bash
  npm run test
```

To run tests for the backend, run the following command

```bash
  npm run test:data-api
```

To run end-to-end tests, run the following command 

```bash
  npm run e2e
```
