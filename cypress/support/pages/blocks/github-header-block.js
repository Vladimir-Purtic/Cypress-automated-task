require('cypress-xpath')

class GitHubHeaderBlock {
    get profileIcon_Image() { return cy.xpath('//img[@data-view-component="true"]') }
    get signOut_Button() { return cy.xpath('//button[@class="dropdown-item dropdown-signout"]') }
    get pullRequests_HyperLink() { return cy.xpath('//a[@aria-label="Pull requests you created"]') }
    get username_HyperLink() { return cy.xpath('//strong[@class="css-truncate-target"]') }
    get gitLogo_Button() { return cy.xpath('//div[contains(@class, "d-md-flex")]//a[@href="https://github.com/"]') }
    get issues_HyperLink() { return cy.xpath('//a[@aria-label="Issues you created"]') }
    get marketplace_HyperLink() { return cy.xpath('//a[@data-selected-links=" /marketplace"]') }
    get explore_HyperLink() { return cy.xpath('//a[@href="/explore"]') }
    get notificationsBell_Button() { return cy.xpath('//a[@href="/notifications"]') }
    get plus_Button() { return cy.xpath('//summary[@aria-label="Create new…"]') }
    get search_Field() { return cy.xpath('//input[@name="q"]') }

    logOut() {
        this.profileIcon_Image.click()
        this.signOut_Button.click()
    }

    clickGitLogo() {
        this.gitLogo_Button.click()
    }

    clickOnProfileIcon() {
        this.profileIcon_Image.click()
    }

    verifyUsername(username) {
        this.profileIcon_Image.click()
        this.username_HyperLink.should('have.text', username)
    }

    clickOnRepository() {
        this.repositoryName_HyperLink.click()
    }

    verifyUserLoggedIn() {
        this.search_Field.should('be.visible')
        this.pullRequests_HyperLink.should('be.visible')
        this.issues_HyperLink.should('be.visible')
        this.marketplace_HyperLink.should('be.visible')
        this.explore_HyperLink.should('be.visible')
        this.notificationsBell_Button.should('be.visible')
        this.plus_Button.should('be.visible')
        this.profileIcon_Image.should('be.visible')
    }
}

module.exports = new GitHubHeaderBlock()