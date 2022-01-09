require('cypress-xpath')

class BasePage {
    get loader_Text() { return  cy.xpath('//div[@class="sr-only"]') }


    verifyPageLoaded() {
        this.loader_Text.should('have.text', 'Loading complete')
    }
}

module.exports = new BasePage()