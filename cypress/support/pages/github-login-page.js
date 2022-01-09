require('cypress-xpath')

class GitHubLoginPage {
    get email_Field() { return cy.xpath('//input[@name="login"]') }
    get password_Field() { return cy.xpath('//input[@id="password"]') }
    get signIn_Button() { return cy.xpath('//input[@type="submit"]') }

    enterEmail(email) {
        this.email_Field.type(email)
    }

    enterPassword(password) {
        this.password_Field.type(password)
    }

    clickSignInButton() {
        this.signIn_Button.click()
    }

    login(email, password) {
        this.email_Field.type(email)
        this.password_Field.type(password)
        this.signIn_Button.click()
    }
}

module.exports = new GitHubLoginPage()