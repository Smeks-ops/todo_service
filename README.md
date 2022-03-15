# TODO Server

## API Doc - https://oses-todo-app.herokuapp.com/api/v1/docs/

## HEROKU Link

## Getting the App Locally

1. Clone this repository with this command
```bash
git clone https://github.com/Smeks-ops/todo_service
```

## Installing The App

2. Install dependencies with this command
```bash
npm install
```

3. Ensure you have the local .env file for configuration parameters. A **sample.env** file is shown in the folder directory for guide.

4. Run the app in development environment using this command
```bash
npm run start:dev
```

## Running tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Routes

```
# documentation route
$ .../api/v1/docs/#/

# default route
$ .../api/v1/docs/#/default/AppController_getHello

# user sign up
$ ...api/v1/docs/#/user/UsersController_createUser

# user login
$ .../api/v1/docs/#/auth/AuthController_login

# create todo
$ .../api/v1/docs/#/to-do/ToDoController_createTodoList

# get all todos
$ .../api/v1/docs/#/to-do/ToDoController_getTodoLists

# get a single todo by name
$ .../api/v1/docs/#/to-do/ToDoController_getATodoLists

# update a todo 
$ .../api/v1/docs/#/to-do/ToDoController_updateATodoList

# delete a todo
$ .../api/v1/docs/#/to-do/ToDoController_removeATodoList
```
