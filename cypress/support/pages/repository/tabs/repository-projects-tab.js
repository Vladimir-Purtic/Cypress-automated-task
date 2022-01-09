require('cypress-xpath')

class RepositoryProjectsTab {
    get header_Text() { return cy.xpath('//div[@class="blankslate"]//h2') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/projects')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Easily access your projects here')
    }
}

module.exports = new RepositoryProjectsTab()