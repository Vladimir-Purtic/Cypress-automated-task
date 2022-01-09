require('cypress-xpath')

class GithubLandingPage {
    get signIn_Button() { return cy.xpath('//a[@href="/login"]') }

    clickSignInButton() {
        this.signIn_Button.click()
    }
}

module.exports = new GithubLandingPage()