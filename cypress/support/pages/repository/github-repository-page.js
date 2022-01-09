require('cypress-xpath')

const repositoryActionsTab = require('../repository/tabs/repository-actions-tab')
const repositoryInsightsTab = require('../repository/tabs/repository-insights-tab')
const repositoryIssuesTab = require('../repository/tabs/repository-issues-tab')
const repositoryProjectsTab = require('../repository/tabs/repository-projects-tab')
const repositoryPullRequestsTab = require('../repository/tabs/repository-pull-requests-tab')
const repositorySecurityTab = require('../repository/tabs/repository-security-tab')
const repositorySettingsTab = require('../repository/tabs/repository-settings-tab')

class GitHubRepositoryPage {
    get codeTab_Button() { return cy.xpath('//span[@data-content="Code"]') }
    get issuesTab_Button() { return cy.xpath('//span[@data-content="Issues"]') }
    get pullRequestsTab_Button() { return cy.xpath('//span[@data-content="Pull requests"]') }
    get actionsTab_Button() { return cy.xpath('//span[@data-content="Actions"]') }
    get projectsTab_Button() { return cy.xpath('//span[@data-content="Projects"]') }
    get securityTab_Button() { return cy.xpath('//span[@data-content="Security"]') }
    get insightsTab_Button() { return cy.xpath('//span[@data-content="Insights"]') }
    get settingsTab_Button() { return cy.xpath('//span[@data-content="Settings"]') } 
    get goToFile_Button() { return cy.xpath('//a[contains(@data-hydro-click, "FIND_FILE_BUTTON") and contains(@class,"btn")]') }
    get addFile_Button() { return cy.xpath('//summary[@class="btn ml-2"]') }
    get code_Button() { return cy.xpath('//summary[@class="btn-primary btn"]') }
    get authorName_HyperLink() { return cy.xpath('//a[@class="commit-author user-mention"]') }
    get authorCommit_HyperLink() { return cy.xpath('//span[contains(@class,"d-none")]//a[@data-test-selector="commit-tease-commit-message"]') }
    get readMeFile_HyperLink() { return cy.xpath('//a[@title="README.md"]') }
    get readMeFileCommitTime_HyperLink() { return cy.xpath('//a[@class="Link--secondary"]') }
    get branches_Button() { return cy.xpath('//summary[@title="Switch branches or tags"]') }
    get readMeRepositoryName_Text() { return cy.xpath('//div[@data-target="readme-toc.content"]//h1') }
    get readMeRepositoryDescription_Text() { return cy.xpath('//div[@data-target="readme-toc.content"]//p') }

    verifyAllTabs(username, repositoryName) {
        this.verifyIssuesTab(username, repositoryName)
        this.verifyPullRequestsTab(username, repositoryName)
        this.verifyActionsTab(username, repositoryName)
        this.verifyProjectsTab(username, repositoryName)
        this.verifySecurityTab(username, repositoryName)
        this.verifyInsightsTab(username, repositoryName)
        this.verifySettingsTab(username, repositoryName)
    }

    deleteRepository(username, repositoryName) {
        this.openSettingsTab()
        repositorySettingsTab.deleteRepository(username, repositoryName)
    }

    openSettingsTab() {
        this.settingsTab_Button.click()
    }

    verifyIssuesTab(username, repositoryName) {
        this.issuesTab_Button.click()
        repositoryIssuesTab.verifyUrl(username, repositoryName)
        repositoryIssuesTab.verifyHeaderText()
    }

    verifyPullRequestsTab(username, repositoryName) {
        this.openPullRequestsTab()
        repositoryPullRequestsTab.verifyUrl(username, repositoryName)
        repositoryPullRequestsTab.verifyHeaderText()
    }

    openPullRequestsTab() {
        this.pullRequestsTab_Button.click()
    }

    verifyActionsTab(username, repositoryName) {
        this.openActionsTab()
        repositoryActionsTab.verifyUrl(username, repositoryName)
        repositoryActionsTab.verifyHeaderText()
    }

    openActionsTab() {
        this.actionsTab_Button.click()
    }

    verifyProjectsTab(username, repositoryName) {
        this.openProjectsTab()
        repositoryProjectsTab.verifyUrl(username, repositoryName)
        repositoryProjectsTab.verifyHeaderText()
    }

    openProjectsTab() {
        this.projectsTab_Button.click()
    }

    verifySecurityTab(username, repositoryName) {
        this.openSecurityTab()
        repositorySecurityTab.verifyUrl(username, repositoryName)
        repositorySecurityTab.verifyHeaderText()
    }

    openSecurityTab() {
        this.securityTab_Button.click()
    }

    verifyInsightsTab(username, repositoryName) {
        this.openInsightsTab()
        repositoryInsightsTab.verifyUrl(username, repositoryName)
        repositoryInsightsTab.verifyHeaderText()
    }

    openInsightsTab() {
        this.insightsTab_Button.click()
    }

    verifySettingsTab(username, repositoryName) {
        this.openSettingsTab()
        repositorySettingsTab.verifyUrl(username, repositoryName)
        repositorySettingsTab.verifyHeaderText()
    }

    openSettingsTab() {
        this.settingsTab_Button.click()
    }

    verifyRepositoryData(username, repositoryName, repositoryDescription) {
        cy.url().should('include', '/' + username + '/' + repositoryName)
        this.branches_Button.should('be.visible')
        this.goToFile_Button
            .should('be.visible')
            .should('contain.text', 'Go to file')
        this.addFile_Button
            .should('be.visible')
            .should('contain.text', 'Add file')
        this.code_Button
            .should('be.visible')
            .should('contain.text', 'Code')
        this.authorName_HyperLink.should('contain.text', username)
        this.authorCommit_HyperLink.should('contain.text', 'Initial commit')
        this.readMeFile_HyperLink.should('be.visible')
        this.readMeFileCommitTime_HyperLink
            .should('be.visible')
            .should('contain.text', 'Initial commit')
        this.readMeRepositoryName_Text.should('contain.text', repositoryName)
        this.readMeRepositoryDescription_Text.should('contain.text', repositoryDescription)
    }

    createNewIssue(title, comment, labels) {
        this.openIssuesTab()
        repositoryIssuesTab.createNewIssue(title, comment, labels)
    }   

    deleteClosedIssue(){
        this.openIssuesTab()
        repositoryIssuesTab.deleteClosedIssue()
    }

    openIssuesTab() {
        this.issuesTab_Button
        .should('be.visible')
        .click()
    }
}

module.exports = new GitHubRepositoryPage()