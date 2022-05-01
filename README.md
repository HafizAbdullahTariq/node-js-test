# Node JS Test

1.) Create an API where the administration can sign up an account

```
curl --location --request POST 'http://localhost:3100/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin2",
    "password": "admin2",
    "role":"ADMIN"
}'
```

2.) Create an API where the administrator can sign in an account

```
curl --location --request POST 'http://localhost:3100/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"admin2",
    "password":"admin2"
}'
```

3.) Create an API where the customer can sign in an account

```
curl --location --request POST 'http://localhost:3100/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user2",
    "password": "user2"
}'
```

4.) Create an API where the customer can sign up an account

```
curl --location --request POST 'http://localhost:3100/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"user2",
    "password":"user2"
}'
```

5.) Create a middleware Authorization header that can determine if the client accessing the API is
an admin or a user

```
server/middleware/jwt.js
```

6.) Create an API where it returns hello world using authorization header with JWT Token and this
API can only be access by admin

```
curl --location --request GET 'http://localhost:3100/private/user' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjIiLCJyb2xlcyI6W3sicm9sZSI6IlVTRVIifV0sImlhdCI6MTY1MTQyMzc5MiwiZXhwIjoxNjUxNDY2OTkyLCJhdWQiOiJodHRwczovL3d3dy50ZXN0aW5nLmNvbSIsImlzcyI6IlRFU1QifQ.Ez8ojtaSUUec7mTPvRQe7OSVXxqLm11FcpZ8-3VP8lpUV8dlzQnNWBEUtdB90mSRpzduKUXBYNVicBi9aGpKQA'
```

7.) Create an API where it returns hello world using authorization header with JWT Token and this
API can only be access by the customer

```
curl --location --request GET 'http://localhost:3100/private/admin' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4yIiwicm9sZXMiOlt7InJvbGUiOiJBRE1JTiJ9XSwiaWF0IjoxNjUxNDI0MDM0LCJleHAiOjE2NTE0NjcyMzQsImF1ZCI6Imh0dHBzOi8vd3d3LnRlc3RpbmcuY29tIiwiaXNzIjoiVEVTVCJ9.N1OvGxP9TAAZEVLexFLIV-XaoGrt6wrCvj5wu754abgdgO4zcCKiyCnJaNr5VioDt8Oy47x-i2IdSO-CWB1r_A'
```

8.) Database must use a sqlite locally when run

```
server/schema/index.js
```

9.) Document your API using swagger

```
openapi.yaml
redoc-static.html
```

## How to run?

1.) npm i
2.) npm run seed
3.) npm start
