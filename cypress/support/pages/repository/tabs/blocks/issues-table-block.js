require('cypress-xpath')

const basePage = require('../../../base-page')
var issueNumber

class IssuesTableBlock {
    get tableIssueTitle_HyperLink() { return cy.xpath(issueNumber + '//a[@data-hovercard-type="issue"]') }
    get tableIssueLables_List() { return cy.xpath(issueNumber + '//span[@class="labels lh-default d-block d-md-inline"]//a') }
    get tableIssueAuthor_HyperLink() { return cy.xpath(issueNumber + '//a[@class="Link--muted"]') }
    get tableIssue_CheckBox() { return cy.xpath(issueNumber + '//input[@name="issues[]"]') }

    setIssueNumber(number) {
        issueNumber = `(//div[contains(@id,"issue_")])[${number}]`
    }

    verifyLabelsList(selector, labels) {
        selector.each((el) => {
            for(let i = 0; i < labels.length; i++) {
                if(el.text() === labels[i]) {
                    cy.wrap(el).should('contain.text', labels[i])
                }
            }
        })
    }

    verifyIssueTable(username, title, labels) {
        this.tableIssueTitle_HyperLink.should('contain.text', title)
        this.tableIssueAuthor_HyperLink.should('contain.text', username)
        this.verifyLabelsList(this.tableIssueLables_List, labels)
    }

    checkIssue() {
        this.tableIssue_CheckBox.click()
    }

    clickOnIssueTitle() {
        basePage.verifyPageLoaded()
        this.tableIssueTitle_HyperLink.click()
    }

    deleteClosedIssue() {
        this.deleteIssue_Button.scrollIntoView().click()
        this.confirmDeleteIssue_Button.click()
        this.successfullyDeletedNotification_Text.should('contain.text', 'The issue was successfully deleted.')
    }
}

module.exports = new IssuesTableBlock()