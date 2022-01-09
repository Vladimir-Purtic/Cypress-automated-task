require('cypress-xpath')

class RepositoryInsightsTab {
    get header_Text() { return cy.xpath('//h2[@class="Subhead-heading"]') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/network/dependencies')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Dependency graph')
    }
}

module.exports = new RepositoryInsightsTab()