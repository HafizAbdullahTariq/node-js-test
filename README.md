# User CRUD App

This is a user CRUD (create, read, update, delete) application written in Node.js. It allows users to perform basic CRUD operations on a list of users stored in a array.

## Prerequisites

Before you can use this application, you need to have Node.js and npm installed on your machine.

## Installation

To install the application, clone this repository and navigate to the project directory:

Then, install the required dependencies:

```
npm install
```

## Usage

To run the application, use the following command:

```
npm start
```

This will start a local server at http://localhost:3100. You can then use the web interface to perform CRUD operations on the users.

To run test cases, use the following command:

```
npm run test
```

To create test cases coverage, use the following command:

```
npm run test:coverage
```

To create openapi specs, use the following command:

```
npm run doc
```

1.) Create user

```
curl --location 'http://localhost:3100/api/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Abdullah",
    "email":"hafiz@email.com"
}'
```

2.) Replace user

```
curl --location --request PUT 'http://localhost:3100/api/user/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"replace",
    "email":"replace@email.com"
}'
```

3.) Update user

```
curl --location --request PATCH 'http://localhost:3100/api/user/0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"hafiz@email.com",
    "address":"updated address"
}'
```

4.) Get user

```
curl --location 'http://localhost:3100/api/user/0'
```

5.) Delete user

```
curl --location --request DELETE 'http://localhost:3100/api/user/0'
```
