require('cypress-xpath')

class RepositoryIssuesTab {
    get issuesTab_Button() { return cy.xpath('//span[@data-content="Issues"]') }
    get header_Text() { return cy.xpath('//div[@class="container-md"]//h3') }
    get newIssue_Button() { return cy.xpath('//a[@role="button"]') }
    get title_Field() { return cy.xpath('//input[@id="issue_title"]') }
    get comment_Field() { return cy.xpath('//textarea[@id="issue_body"]') }
    get submitNewIssue_Button() { return cy.xpath('//button[@class="btn-primary btn"]') }
    get assignYourself_Button() { return cy.xpath('//button[@class="btn-link Link--muted js-issue-assign-self"]') }
    get labels_Button() { return cy.xpath('//details[@id="labels-select-menu"]') }
    get labels_List() { return cy.xpath('//label[@role="menuitemcheckbox"]//span') }
    get issueTitle_Text() { return cy.xpath('//span[@class="js-issue-title markdown-title"]') }
    get authorName_HyperLink() { return cy.xpath('//h3[contains(@class,"timeline-comment-header-text")]//strong') }
    get commentText_Text() { return cy.xpath('//tr[@class="d-block"]//p') }
    get selectedLabels_List() { return cy.xpath('//div[@class="js-issue-labels d-flex flex-wrap"]//a') }
    get assignedUser_HyperLink() { return cy.xpath('//a[contains(@class,"assignee")]') }
    get tableIssueTitle_HyperLink() { return cy.xpath('//a[@data-hovercard-type="issue"]') }
    get tableIssueLables_List() { return cy.xpath('//span[@class="labels lh-default d-block d-md-inline"]//a') }
    get tableIssueAuthor_HyperLink() { return cy.xpath('//a[@class="Link--muted"]') }
    get tableAssignee_DropDown() { return cy.xpath('//summary[@title="Assignees"]') }
    get tableAssignedUser_HyperLink() { return cy.xpath('//details-menu[contains(@class,"right-md-0")]//strong[@class="mr-2"]') }
    get tableIssue_CheckBox() { return cy.xpath('//input[@name="issues[]"]') }
    get tableMarkAs_Dropdown() { return cy.xpath('(//summary[contains(@class,"select-menu-button btn-link")])[1]') }
    get tableMarkAsClosed_Option() { return cy.xpath('//button[@value="closed"]') }
    get tableNumberOfClosedIssues() { return cy.xpath('//div[contains(@class,"Box")]//a[@class="btn-link "]') }
    get tableNumberOfOpenedIssues() { return cy.xpath('//div[contains(@class,"Box")]//a[@class="btn-link selected"]') }
    get deleteIssue_Button() { return cy.xpath('//summary[@class="d-inline-block"]') }
    get confirmDeleteIssue_Button() { return cy.xpath('//button[@name="verify_delete"]') }
    get successfullyDeletedNotification_Text() { return cy.xpath('//div[@class=" px-2"]') }

    verifyUrl(username, repositoryName){
        cy.url().should('include','/' + username + '/' + repositoryName + '/issues')
    }

    verifyHeaderText() {
        this.header_Text
            .should('be.visible')
            .should('contain.text', 'Welcome to issues!')
    }

    clickNewIssueButton() {
        this.newIssue_Button.click()
    }

    enterTitleOfIssue(title) {
        this.title_Field.type(title)
    }

    enterCommentOfIssue(comment) {
        this.comment_Field.type(comment)
    }

    clickAssignYourself() {
        this.assignYourself_Button.click()
    }

    clickSubmitNewIssueButton() {
        this.submitNewIssue_Button.click()
    }

    selectLabels(labels) {
        this.labels_Button.click()
        this.labels_List.should('be.visible')
        this.labels_List.each((el) => {
            for(let i = 0; i < labels.length; i++) {
                if(el.text() === labels[i]) {
                    cy.wrap(el).click()
                }
            }
        })
        this.labels_Button.click()
    }

    checkLabelsList(selector, labels) {
        selector.each((el) => {
            for(let i = 0; i < labels.length; i++) {
                if(el.text() === labels[i]) {
                    cy.wrap(el).should('contain.text', labels[i])
                }
            }
        })
    }

    createNewIssue(title, comment, labels) {
        this.clickNewIssueButton()
        this.enterTitleOfIssue(title)
        this.enterCommentOfIssue(comment)
        this.clickAssignYourself()
        this.selectLabels(labels)
        this.clickSubmitNewIssueButton()
    }

    verifyNumberOfOpenedIssues(number) {
        this.tableNumberOfOpenedIssues
            .should('be.visible')
            .should('contain.text', `${number} Open`)
    }

    verifyNumberOfClosedIssues(number) {
        this.tableNumberOfClosedIssues
            .should('be.visible')
            .should('contain.text', `${number} Closed`)
    }

    clickOnIssesTab() {
        this.issuesTab_Button.click() 
    }

    verifyAssignedUser(username) {
        this.tableAssignee_DropDown.click()
        this.tableAssignedUser_HyperLink.should('contain.text', username)
        this.tableAssignee_DropDown.click()
    }

    verifyIssueIsCreated(username, title, comment, labels) {
        this.issueTitle_Text.should('contain.text', title)
        this.authorName_HyperLink.should('contain.text', username)
        this.commentText_Text.should('contain.text', comment)
        this.checkLabelsList(this.selectedLabels_List, labels)
        this.assignedUser_HyperLink.should('contain.text', username)
    }

    markIssueAsClosed() {
        this.tableMarkAs_Dropdown.click()
        this.tableMarkAsClosed_Option.click()
    }

    clickOnClosedIssues() {
        this.tableNumberOfClosedIssues.click()
    }

    verifyIssueTable(username, title, labels) {
        this.tableIssueTitle_HyperLink.should('contain.text', title)
        this.tableIssueAuthor_HyperLink.should('contain.text', username)
        this.checkLabelsList(this.tableIssueLables_List, labels)
        this.tableAssignee_DropDown.click()
        this.tableAssignedUser_HyperLink.should('contain.text', username)
        this.tableAssignee_DropDown.click()
    }

    openClosedIssues() {
        cy.wait(1000)
        this.tableNumberOfClosedIssues
        .should('be.visible')
        .click({force:true})
    }

    deleteClosedIssue() {
        this.deleteIssue_Button
            .scrollIntoView()
            .click()
        this.confirmDeleteIssue_Button.click()
        this.successfullyDeletedNotification_Text.should('contain.text', 'The issue was successfully deleted.')
    }
}

module.exports = new RepositoryIssuesTab()