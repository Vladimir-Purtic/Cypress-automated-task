require('cypress-xpath')

class RepositoryPullRequestsTab {
    get header_Text() { return cy.xpath('//div[@class="container-md"]//h3') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/pulls')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', "Welcome to pull requests!")
    }
}

module.exports = new RepositoryPullRequestsTab()