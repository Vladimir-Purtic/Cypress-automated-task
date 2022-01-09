/// <reference types="cypress"/>

const loginPage = require('../../support/pages/github-login-page')
const homePage = require('../../support/pages/github-home-page')
const createARepositoryPage = require('../../support/pages/repository/github-create-a-repository-page')
const repositoryPage = require('../../support/pages/repository/github-repository-page')
const userData = require('../../fixtures/userData.json')
const repositoryData = require('../../fixtures/repositoryData.json')
const headerBlock = require('../../support/pages/blocks/github-header-block')

describe('Login feature', () => {

    beforeEach(() => {
        loginPage.login(userData.users.loginAndRepositoryUser.email, userData.users.loginAndRepositoryUser.password)
    })

    it('Should create a new repository', () => {
        homePage.clickOnCreateRepositoryButton()
        createARepositoryPage.enterRepositoryName(repositoryData.name)
        createARepositoryPage.enterRepositoryDescription(repositoryData.description)
        createARepositoryPage.checkPrivateRadioButton()
        createARepositoryPage.addReadmeFile()
        createARepositoryPage.createRepository()      
    })

    it('Newly created repository should be visible and should have valid data', () => {
        homePage.verifyRepositoryName(userData.users.loginAndRepositoryUser.username, repositoryData.name)
        homePage.clickOnRepository()
        repositoryPage.verifyRepositoryData(userData.users.loginAndRepositoryUser.username, repositoryData.name, repositoryData.description)
        repositoryPage.verifyAllTabs(userData.users.loginAndRepositoryUser.username, repositoryData.name)
    })

    after(() => {
        //Delete repository for test stability
        headerBlock.clickGitLogo()
        homePage.clickOnRepository()
        repositoryPage.deleteRepository(userData.users.loginAndRepositoryUser.username, repositoryData.name)
    })
})