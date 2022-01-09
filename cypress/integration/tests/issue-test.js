/// <reference types="cypress"/>

const loginPage = require('../../support/pages/github-login-page')
const homePage = require('../../support/pages/github-home-page')
const repositoryPage = require('../../support/pages/repository/github-repository-page')
const issuesTab = require('../../support/pages/repository/tabs/repository-issues-tab')
const issuesTableBlock = require('../../support/pages/repository/tabs/blocks/issues-table-block')
const userData = require('../../fixtures/userData.json')
const issueData = require('../../fixtures/issueData.json')

describe('Creating a issue Feature', () => {

    beforeEach(() => {
        loginPage.login(userData.users.issueUser.email, userData.users.issueUser.password)
    })
  
    it('Should verify creating/closing issue works properly', () => {
        homePage.clickOnRepository()
        repositoryPage.createNewIssue(issueData.title, issueData.comment, issueData.labels)
        issuesTab.verifyIssueIsCreated(userData.users.issueUser.username, issueData.title, issueData.comment, issueData.labels)
        issuesTableBlock.setIssueNumber(1)
        repositoryPage.openIssuesTab()
        issuesTab.verifyNumberOfOpenedIssues(7)
        issuesTab.verifyNumberOfClosedIssues(0)
        issuesTableBlock.verifyIssueTable(userData.users.issueUser.username, issueData.title, issueData.comment, issueData.labels)
        issuesTab.verifyAssignedUser(userData.users.issueUser.username)
        issuesTableBlock.checkIssue()
        issuesTab.markIssueAsClosed()
        issuesTab.verifyNumberOfOpenedIssues(6)
        issuesTab.verifyNumberOfClosedIssues(1)
        issuesTab.clickOnClosedIssues()
        issuesTableBlock.verifyIssueTable(userData.users.issueUser.username, issueData.title, issueData.comment, issueData.labels)
    }) 

    after(() => {
        //Delete issue for test stability
        issuesTableBlock.clickOnIssueTitle()
        issuesTab.deleteClosedIssue()
        issuesTab.verifyNumberOfOpenedIssues(6)
        issuesTab.verifyNumberOfClosedIssues(0)
    })
})