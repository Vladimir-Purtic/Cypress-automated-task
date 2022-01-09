require('cypress-xpath')

class RepositoryActionsTab {
    get header_Text() { return cy.xpath('//h1[@class="mb-2 lh-condensed"]') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/actions/new')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Get started with GitHub Actions')
    }
}

module.exports = new RepositoryActionsTab()