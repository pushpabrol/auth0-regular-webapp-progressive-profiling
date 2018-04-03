# Auth0 Regular Webapp Progressive Profiling

This node.js regular web app sample illustrates progressive profiling by detecting the need
to capture Name and Age before allowing user to proceeed and do anything

Also offers examples on how to do:

1. Embedded Lock usage
2. Centralised Login usage
4. Single Sign-On usage
5. Single Sign-Out usage
6. Calling Auth0 userinfo api endpoint
7. Calling two different external APIs using same Resource API and different scopes
8. Progressive Profiling

This application demonstrates the usage of a single Resource Server with
namespaced scoping representing multiple APIs. This sample consists of:

- 2 Node.js APIs: `contacts` and `calendar` (you can think of them as microservices);
- 1 Resource Server representing the 2 APIs;
- 2 Namespaced scopes: `read:contacts` and `read:calendar`;
- The Code Authorization Grant flow to obtain an `access_token` that works for both APIs


## Setup

### Dashboard

#### API

You will need to create an API using the Auth0 Dashboard called `organiser
Service` with the unique identifier `organise` (this is later used in the
`audience` parameter of your Authorization URL).

The API needs two namespaced scopes:

* `read:contacts`
* `read:calendar`

Also need to 

- Switch `Skip User Consent off` for the Organize Resource Server in Auth0 Dashboard
- Switch on `Allow Online Access` for the Organise Resource Server in Auth0 Dashboard


#### Create a client of type regular web application

Create a regular web application Client.

Under settings ensure you have:

Client-Type: Regular Web Application 

Allowed Callback URLs:
 - http://app1.com:3000/callback

Allowed Web Origins:
 - http://app1.com:3000

Allowed Logout URLs
 - http://app1.com:3000

Under tenant settings -> advanced -> Allowed Logout URLs
 - http://app1.com:3000

Under Advanced Settings -> Oauth, switch ON the OIDC Conformant toggle.

#### Connection Setup

Set up the Username-Password-Authentication connecrtion for this client
Ensure this is associated with your Client.


#### Rules Setup

Copy the rule `rules/checkProfileIncomplete-rule.js` into a new Rule in the Dashboard.

Name the Rule appropriate eg. `Check SMS Account Linked`

You will have to adjust the 2nd line to match your own client ID


#### Authorize Client to call the Management API

1. Go to https://manage.auth0.com/#/apis
2. Click on "Auth0 Management API"
3. Click on the "Non Interactive Clients" tab
4. Filter the client id of the client you had created above
5. Turn the "Unauthorized" toggle on
6. Select scope read:users & update:users
7. Click on the "Update" button

### Locally

Add:

```
127.0.0.1  app1.com
```

to your `/etc/hosts` file.

This is important, all references locally are to `app1.com` and not `localhost`.
Required for cross-origin and SSO to work properly.


## Running the Sample

Install the dependencies.

```bash
npm install
```

Rename `.env.example` to `.env` and replace the values for `AUTH0_CLIENT_ID`,
`AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` (plus other settings) with your Auth0
credentials.  If you don't yet have an Auth0 account, [sign
up](https://auth0.com/signup) for free.

```bash
# copy configuration and replace with your own
cp .env.example .env
```

## Enable Cross Origin Authentication ( For embedded login only!)

In order to be able to log-in with user and password you need to make sure you
take into account the details explained in the [Cross Origin Authentication
documentation](https://auth0.com/docs/cross-origin-authentication). 


## Run the Application

Run the application by executing the command below.

```bash
npm run start_all
```

The app will be served at `http://app1.com:3000`.

Two APIs are also running on ports `3001` and `3002`


## Test

Load the application `http://app1.com:3000` in the browser

Click on the "Universal Login" button. You will be redirected to the Auth0 login screen

Signup with a username and password. You will be logged in and redirected back to the application

On the application you will see a message and a screen for progressive profiling. 

The application will only allow you to proceed once you have provided Name and Age

Once Name and Age are provided the application will reload and you will see the normal landing page which allows you to view profile, call an API etc

 

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free account in Auth0

1. Go to [Auth0](https://auth0.com) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
