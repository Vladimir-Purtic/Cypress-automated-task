require('cypress-xpath')

class RepositorySecurityTab {
    get header_Text() { return cy.xpath('//h2[@class="Subhead-heading"]') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/security')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Security overview')
    }
}

module.exports = new RepositorySecurityTab()