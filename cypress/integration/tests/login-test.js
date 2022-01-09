/// <reference types="cypress"/>

const loginPage = require('../../support/pages/github-login-page')
const headerBlock = require('../../support/pages/blocks/github-header-block')
const userData = require('../../fixtures/userData.json')

describe('Login feature', () => {
     
    it('Should successfully login and check if username is right', () => {
        loginPage.login(userData.users.loginAndRepositoryUser.email, userData.users.loginAndRepositoryUser.password)
        headerBlock.verifyUserLoggedIn()
        headerBlock.verifyUsername(userData.users.loginAndRepositoryUser.username)
    })
})