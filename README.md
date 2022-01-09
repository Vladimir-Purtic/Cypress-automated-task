# Cypress-automation-task
In order to run tests you need to install Node.js and Cypress.
Note that GitHub requires email verification code when you try to login from new ip address, so in order for tests to work, you should create two new GitHub accounts and put their data in cypress/fixtures/userData.json
First account is used for running login and repository tests and that account must NOT have any created repositories before test runs.
Secont account is used for running issue test and that account MUST have created repository with 6 random issues created
In order to run tests you need to type 'npx cypress open' in terminal, then you can select which tests you want to run.
