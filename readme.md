# REST API Contacts Application (NodeJS, Express, MongoDB)

This is a bare-bones example of a contacts application providing a REST
API to a MongoDB-backed model.

- [How To Install App](#install)
- [REST API](#rest-api)
- [Users Routes](#users)
  - [Registration](#user-registration)
  - [Login](#user-login)
  - [Logout](#user-logout)
  - [Current user](#get-current-user)
  - [Update Subscription](#update-user-subscription)
  - [Update Avatar](#update-user-avatar)

## Install

    npm install

## Run the app in production mode

    npm start

## Run the app in development mode

    npm run start:dev

## Run the linter

    npm run lint

## Run the linter in fix mode

    npm run lint:fix

# REST API

The REST API to the example app is described below.

# Users

## User Registration

### Request

`POST /api/users/register`

    HTTP/1.1

    Body: { "name": string, email": string, "password": string }

### Response

    HTTP/1.1 201 Created
    Content-Type: application/json

    Body: { "user": { "name": string, "email": string, "verificationToken": string, "verify": boolean } }
    
### Bad Response

    HTTP/1.1 409  OK
    Status: Email in use
    Content-Type: application/json

## User Login

### Request

`POST /api/users/login`

    HTTP/1.1

    Body: { "email": string, "password": string }

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    Body: { "token": string, "user": { "name": string,} }
    
### Bad Response

    HTTP/1.1 401  OK
    Status: No user with password found
    Content-Type: application/json


## User Logout

### Request

`POST /api/users/logout`

    HTTP/1.1
    Host: "https://igor-bulyzhenkov.herokuapp.com/"
    Authorization: Bearer Token

### Response

    HTTP/1.1 204 No Content
    
### Bad Response

    HTTP/1.1 401  OK
    Status: Not authorized
    Content-Type: application/json

## Get Current User

### Request

`GET /api/users/current`

    HTTP/1.1
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    Body: { "name": string, "token": string }
    
 ### Bad Response

    HTTP/1.1 401  OK
    Status: Not authorized
    Content-Type: application/json

## Verify User

### Request

`POST /api/users/verify`

    HTTP/1.1
    Authorization: Bearer

    Body: { "email": string, }

### Response

    HTTP/1.1 200 OK
    Status: verify
    Content-Type: application/json
    
    Body: { "message": "Verification email sent" } 
    
 ### Bad Response

    HTTP/1.1 400  OK
    Status: Not found
    Content-Type: application/json
    
    Body: { "message": "Verification has already been passed" }

## Verify User Email 

### Request

`GET /api/users/verify/:verificationToken`

    HTTP/1.1
    Content-Type: multipart/form-data

### Response

    HTTP/1.1 200 OK
    Status: verify
    Content-Type: application/json

    Body: {  "user": { "name": string, "token": string,}, }
    
### Bad Response

    HTTP/1.1 404  OK
    Status: Not authorized , error.message
    Content-Type: application/json
