# serverless-notes-app
A CRUD Notes REST API built on the AWS Lambda service.

# Features
This simple application allows users to do the following;
1. Login via auth0
2. Create a note
3. View all the notes belonging to the current user
4. Update notes belonging to the current user
5. Delete notes belonging to the current user

# Dependencies
This is a cloud application that primarily relies on AWS for functionality and Auh0 for login.
Below is a comprehensive list of services in use;
1. [AWS Lambda](https://aws.amazon.com/lambda/)
2. [Dynamo DB](https://aws.amazon.com/dynamodb/)
3. [Auth0](https://auth0.com/)

# Installation and local setup
1. Navigate to your projects directory on terminal.
2. Clone this repository.
  ```sh
  git clone git@github.com:lewisemm/serverless-notes-app.git
  ```

3. Navigate to the downloaded repository.

  ```sh
  ce serverless-notes-app/
  ```

4. Install `serverless` package globally.

  ```sh
  npm install -g serverless
  ```

5. Install the application's dependencies

  ```sh
  npm install package.json
  ```

6. Start the DynamoDb service in the background on your local machine

  ```sh
  sls dynamodb start &
  ```

7. Start the application locally

  ```sh
  sls offline
  ```

# Deploying to AWS
