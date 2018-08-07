
[![Build Status](https://travis-ci.com/Phunmbi/My-Diary.svg?branch=develop)](https://travis-ci.com/Phunmbi/My-Diary) [![Coverage Status](https://coveralls.io/repos/github/Phunmbi/My-Diary/badge.svg?branch=develop)](https://coveralls.io/github/Phunmbi/My-Diary?branch=develop)

# MyDiary

A simple journal / Diary application. It helps you keep your thoughts and diary entries in a secure location while ensuring that you can use it on the go. It's a lightweight application built for your convenience.

Check out user interface [here](https://phunmbi.github.io/My-Diary/).


This is the full [documentation](https://morning-falls-51849.herokuapp.com/api/v1/docs/). With details on how to implement.

## Getting Started

To get this unto your local machine, all you need to do is clone this repo. 

### Prerequisites

Before you can install this though, It's advisable you have a `postgres` database set up.
Also have `postman` installed to test the routes.

### Installing

Once you have cloned this repo and installed the prerequisites.

Next you need to install all necessary dependencies.
You can do this by running `npm install`

With the dependencies installed and a `postgres` database setup on your local machine. you are good to go.

## Running the tests

to run the automated tests. just run `npm run test` And this runs all the automated tests for all endpoints, authorization and validation setups.

### Break down into end to end tests

This tests check every single exit point of this application, and makes sure that every thing runs well. If any test fails. you can reach out.

If you want to test the API endpoints you can do this with postman. First run `npm run dev` to set up the server.

Then with postman, you can test the following routes

Test the user set up routes on
`POST \api\v1\auth\signup`
`POST \api\v1\auth\login`

Then you can test the entries resources on
`POST \api\v1\entries`
`GET \api\v1\entries`
`GET \api\v1\entries\:id`
`PUT \api\v1\entries\:id`
`DELETE \api\v1\entries\:id`

## Built With

* [Express](https://expressjs.com/) - The web framework used
* [JWT](https://jwt.io/) - User Authorization
* [BCrypt](https://github.com/kelektiv/node.bcrypt.js/) - For password security

## Authors

* **Adeniyi Adeyokunnu** 
