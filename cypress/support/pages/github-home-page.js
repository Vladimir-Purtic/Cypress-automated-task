require('cypress-xpath')

class GitHubHomePage {
    get profileIcon_Image() { return cy.xpath('//img[@data-view-component="true"]') }
    get signOut_Button() { return cy.xpath('//button[@class="dropdown-item dropdown-signout"]') }
    get createRepository_Button() { return cy.xpath('//div[contains(@class,"dashboard-sidebar")]//a[contains(@class,"btn")]') }
    get username_HyperLink() { return cy.xpath('//strong[@class="css-truncate-target"]') }
    get repositoryName_HyperLink() { return cy.xpath('//div[contains(@class, "dashboard-sidebar")]//div[@class="wb-break-word"]//a[@data-hovercard-type="repository"]') }

    logOut() {
        this.profileIcon_Image.click()
        this.signOut_Button.click()
    }

    clickOnProfileIcon() {
        this.profileIcon_Image.click()
    }

    clickOnCreateRepositoryButton() {
        this.createRepository_Button.click()
    }

    verifyUsername(username) {
        this.profileIcon_Image.click()
        this.username_HyperLink.should('have.text', username)
    }

    verifyRepositoryName(username, repositoryName) {
        this.repositoryName_HyperLink
            .should('be.visible')
            .should('contain.text', username + '/' + repositoryName)
    }

    clickOnRepository() {
        this.repositoryName_HyperLink
            .should('be.visible')
            .click()
    }
}

module.exports = new GitHubHomePage()