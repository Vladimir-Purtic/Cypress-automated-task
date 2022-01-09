require('cypress-xpath')

class GitHubCreateARepositoryPage {
    get repositoryName_Field() { return cy.xpath('//input[@id="repository_name"]') }
    get repositoryDescription_Field() { return cy.xpath('//input[@id="repository_description"]') }
    get private_RadioButton() { return cy.xpath('//input[@value="private"]') }
    get addReadmeFile_CheckBox() { return cy.xpath('//input[@id="repository_auto_init"]') }
    get createRepository_Button() { return cy.xpath('//button[@class="btn-primary btn"]') }

    clickSignInButton() {
        this.signIn_Button.click()
    }

    enterRepositoryName(name) {
        this.repositoryName_Field.type(name)
    }

    enterRepositoryDescription(description) {
        this.repositoryDescription_Field.type(description)
    }

    checkPrivateRadioButton() {
        this.private_RadioButton.click()
    }

    addReadmeFile() {
        this.addReadmeFile_CheckBox.click()
    }

    createRepository() {
        this.createRepository_Button.click()
    }
}

module.exports = new GitHubCreateARepositoryPage()