[![Netlify Status](https://api.netlify.com/api/v1/badges/5e8bbcab-8156-49f2-bfbc-863ef1cda7bc/deploy-status)](https://app.netlify.com/sites/dancing-custard-2450ff/deploys)

# Back Office Web

Spotifiuby's Back Office Web is a web application that allows the management of the Spotifiuby's Users and Content.

## Features

### User Management

- List Users
- See User data
- Update user roles
- Block/Unblock users
- See user content
- Top-up user balance

### Content Management

- Content includes Songs, Albums and Playlists
- List Content
- See Content data
- Block content

### Payments

- See system balance
- List Payments

### Metrics

- User Metrics
  - Blocked users
  - Role / Provider metrics
  - Sign up / Login metrics
  - Password resets
  -

## Development

Clone the repo.
You'll need to have `node` and `yarn` installed.

Installing dependencies:

```console
yarn
```

Running the project in development mode:

```console
yarn dev
```

### Environment

You'll need to set the following environment variables:

- `API_KEY` : Backend api key - Can be used to bypass bearer authentication.
- `FIREBASE_PRIVATE_KEY` : Firebase project credentials
- `COOKIE_SECRET_CURRENT` : Secret used for auth
- `COOKIE_SECRET_PREVIOUS` : Secret used for auth

### Deployment

Deployment is made automatically on pushing to the master branch.

## API Routes

The following REST endpoints are available.

all endpoints should either receive an authorization token or the api key as a header.

### Users

##### Get All Users

Route: `GET /api/users`
Description: Get all firebase users
Return Schema:

```json
{
  "users": [
    {
      "uid": "string",
      "email": "string",
      "emailVerified": "boolean",
      "displayName": "string",
      "photoURL": "string",
      "disabled": "boolean",
      "metadata": {
        "lastSignInTime": "date",
        "creationTime": "date"
      },
      "customClaims": { "role": "string" },
      "providerData": [
        {
          "providerId": "string"
          ...
        }
      ],
      ...
    },
  ]
}
```

##### Get User Data

Route: `GET /api/users/data/{uid}`
Description: Get a firebase user
Return Schema:

```json
{
  "message": "Success",
  "user": {
    "uid": "083OLRCk71Poa8SYFaoPSTB2JQx2",
    "email": "premium@gmail.com",
    "emailVerified": false,
    "displayName": "Ali",
    "photoURL": "https://storage.googleapis.com/rostov-spotifiuby.appspot.com/pfp/083OLRCk71Poa8SYFaoPSTB2JQx2?t=1656084952",
    "disabled": false,
    "metadata": {
      "lastSignInTime": "Fri, 24 Jun 2022 15:36:22 GMT",
      "creationTime": "Fri, 10 Jun 2022 22:36:58 GMT"
    },
    "customClaims": {
      "role": "artist"
    },
    "tokensValidAfterTime": "Fri, 10 Jun 2022 22:36:58 GMT",
    "providerData": [
      {
        "uid": "premium@gmail.com",
        "displayName": "Ali",
        "email": "premium@gmail.com",
        "photoURL": "https://storage.googleapis.com/rostov-spotifiuby.appspot.com/pfp/083OLRCk71Poa8SYFaoPSTB2JQx2?t=1656084952",
        "providerId": "password"
      }
    ]
  }
}
```

##### Set Role

Route: `POST /api/users/setRole/{uid}`
Description: Set an users role
Parameter Schema:

```json
{
  "role": "string"
}
```

##### Set Disabled

Route: `POST /api/users/setDisabled/{uid}`
Description: Set an users disabled status
Parameter Schema:

```json
{
  "disabled": "string"
}
```

##### Metrics

Route: `GET /api/users/metrics`
Description: Get firebase user metrics
Return Schema:

```json
{
  "passwordReset": number
}
```
