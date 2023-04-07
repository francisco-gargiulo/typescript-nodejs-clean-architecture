# TypeScript-based Node.js microservice based on Clean Architecture Principles

## Introduction

This is an API rest based on clean architecture which exposes a basic CRUD services about a User domain model.

The API is written in typescript on nodejs using expressjs. The data persists in memory.

## Architecture

The architecture of this API microserviece is guided in design by the alignments of [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Overview

The architecture of this TypeScript-based Node.js microservice follows the Clean Architecture principles, which aims to create a maintainable and scalable system by separating concerns into different layers. The main layers in this microservice are:

1. Adapters: This layer is responsible for connecting the microservice to external systems, such as the web framework (Express.js) and the data storage (in-memory database). The adapters translate the inputs and outputs of the microservice to match the external systems' interfaces.
2. Domain: This layer contains the core business logic of the microservice, including the entity definitions, repository interfaces, and service interfaces. The entities are the building blocks of the domain, while the repository and service interfaces define the contracts that the other layers must follow.
3. Use Cases: This layer contains the use case implementations, which define the application-specific behaviors and act as a bridge between the adapters and the domain. The use cases interact with the domain services and repositories to execute the required operations.
4. Entry Point: This is the main entry point to the microservice, responsible for setting up the adapters, domain logic, and use cases, and starting the server.

By following the Clean Architecture principles, this microservice achieves a high level of separation of concerns, making it easier to maintain, test, and scale. Each layer has a specific role, and changes in one layer are less likely to impact the other layers. This structure also makes it easier to replace external systems, such as the web framework or data storage, by simply updating the adapters.

### Folder structure

Tipically, a clean architecture based will have a folder structure as next:

```txt
├── adapters/
│   ├── express/
│   │   ├── routes.ts
│   │   ├── server.ts
│   │   └── startup.ts
│   └── memory/
│       └── MemoryUserRepository.ts
├── domain/
│   ├── entities/
│   │   └── User.ts
│   ├── repositories/
│   │   └── UserRepository.ts
│   └── services/
│       └── UserService.ts
├── usecases/
│   │   createUser.ts
│   │   getUser.ts
│   │   updateUser.ts
│   └── deleteUser.ts
└── main.ts
```

Here's a brief explanation of each folder and file:

- `adapters/`: This folder contains the adapters that connect the microservice to the outside world. In this case, there are two adapters: express/ for handling HTTP requests and memory/ for interacting with a Memory database.
- `adapters/express/`: This folder contains the files for setting up the Express server, including routes/ for defining the HTTP routes and startup.ts for initializing the server.
- `adapters/memory/`: This folder contains the files for interacting with the on memory database, including userRepository.ts for defining the database operations for the User entity.
- `domain/`: This folder contains the core domain logic of the microservice. It is divided into three subfolders:
  - `entities/`: This folder contains the entity definitions for the microservice. In this case, there is one entity: User.ts.
  - `repositories/`: This folder contains the repository interfaces for the microservice. In this case, there is one repository interface: UserRepository.ts.
  - `services/`: This folder contains the service interfaces for the microservice. In this case, there is one service interface: UserService.ts.
- `useCases/`: This folder contains the use cases for the microservice.
- `main.ts`: This is the entry point to the microservice, which sets up the adapters, use cases, and domain logic, and starts the server.

## Running the Microservice

To set up and run the microservice, follow the steps below:

### Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

### Installation

#### Clone the repository

```sh
git clone https://github.com/francisco-gargiulo/typescript-nodejs-clean-architecture
cd typescript-nodejs-clean-architecture
```

#### Install dependencies

```sh
npm i
```

#### Running the Application

To start the development server, run:

```sh
npm run dev
```

The application will be available at http://localhost:3000

#### Running Tests

To run tests, execute:

```sh
npm test
```

## Use Cases

This are the mainly use cases 

- Create User
- Read User
- Update User
- Delete User

## Entities

User:

```
- id: string
- name: string
- email: string
- password: string
- createdAt: Date
- updatedAt: Date
```

## API

For this API endpoints we'll use REST Level 2 (HTTP Verbs - [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)). 

### Get User

Retrieve a user with the specified ID.

Request:

```http
GET /users/:id
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123456",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "createdAt": "2023-04-05T14:30:00.000Z",
  "updatedAt": "2023-04-05T14:30:00.000Z"
}

```

### Create User

Create a new user with the specified name, email, and password.

Request:
 
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}

```

Response:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "123456",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "createdAt": "2023-04-05T14:30:00.000Z",
  "updatedAt": "2023-04-05T14:30:00.000Z"
}
```

### Update User

Update the name, email, and/or password of a user with the specified ID.

Request:

```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "password": "newpassword"
}
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "123456",
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "createdAt": "2023-04-05T14:30:00.000Z",
  "updatedAt": "2023-04-05T14:45:00.000Z"
}
```

### Delete User

Delete the user with the specified ID.

Request:

```http
DELETE /users/:id
```

Response:

```http
HTTP/1.1 204 No Content
```
