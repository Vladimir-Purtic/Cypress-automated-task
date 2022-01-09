require('cypress-xpath')

class RepositorySettingsTab {
    get header_Text() { return cy.xpath('//div[@class="Subhead"]//h2') }
    get deleteRepository_Button() { return cy.xpath('//details[contains(@class,"flex-md-order-1")]//summary') }
    get confirmDelete_Input() { return cy.xpath('//details-dialog[@aria-label="Delete repository"]//input[@name="verify"]') }
    get confirmDeleteRepository_Button() { return cy.xpath('//form[contains(@action,"/delete")]//button') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/settings')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Settings')
    }

    deleteRepository(username, repositoryName) {
        this.deleteRepository_Button
            .scrollIntoView()
            .click()
        this.confirmDelete_Input.type(username + '/' + repositoryName)
        this.confirmDeleteRepository_Button.click()
    }
}

module.exports = new RepositorySettingsTab()