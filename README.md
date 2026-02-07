# FinEdge – Personal Finance & Expense Tracker API

A RESTful API backend for a personal finance tracker using Node.js and Express.

## Features
- User Registration
- Transaction Management (Income/Expense)
- Data Persistence (JSON files)
- Analytics & Summary
- RESTful Architecture
- Unit & Integration Tests (Mocha, Chai, Sinon, Supertest)

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    For development with nodemon:
    ```bash
    npm run dev
    ```

## API Endpoints

### Users
- `POST /users`: Register a new user
- `GET /users/:id`: Get user details

### Transactions
- `POST /transactions`: Add income/expense
- `GET /transactions`: List all transactions
- `GET /transactions/:id`: Get transaction details
- `PATCH /transactions/:id`: Update transaction
- `DELETE /transactions/:id`: Delete transaction

### Analytics
- `GET /summary`: Get income/expense summary and balance

## Testing

Run unit and integration tests:
```bash
npm test
```

## Project Structure
- `src/app.js`: App configuration
- `src/controllers/`: Request handlers
- `src/services/`: Business logic
- `src/models/`: Data access layer
- `src/routes/`: Route definitions
- `src/middleware/`: Custom middleware (Logger, Error Handler, Validator)
- `src/data/`: JSON data files
- `test/`: Test suites
