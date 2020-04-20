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
    cd serverless-notes-app/
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
1. Login to AWS
2. Navigate to the [Identity and Access Management (IAM)](https://aws.amazon.com/iam/) service
3. Add an IAM user [using the console option](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console).
  i. select the programmatic access option. You will get an access key and secret id. Use these to configure serverless framework
  ii. for permissions, add administrator access. 
  > This is obviously a security risk, but it will do for such a hobby application. APPS ON PRODUCTION WILL REQUIRE THE USE OF LEAST PRIVILEGE PERMISSIONS.
4. Run the following command to configure serverless credentials.
  ```sh
  aws configure
  ```
5. Provide the access key and secret id from step (3) above. Leave the rest of the options as default unless otherwise desired.
6. Run the following command to deploy.
  ```sh
  sls deploy -v
  ```
