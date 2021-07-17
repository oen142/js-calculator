context('Cookies', () => {
    beforeEach(() => {
        Cypress.Cookies.debug(true)

        cy.visit('https://example.cypress.io/commands/cookies')

        cy.clearCookies()
    })


    it('cy.getCookie() - get a browser cookie', () => {
        cy.get('#getCookie .set-a-cookie').click()

        cy.getCookie('token').should('have.property', 'value', '123ABC')
    })

    it('cy.getCookies() - get browser cookies', () => {
        cy.getCookies().should('be.empty')

        cy.get('#getCookies .set-a-cookie').click()

        cy.getCookies().should('have.length', 1).should((cookies) => {
            expect(cookies[0]).to.have.property('name', 'token')
            expect(cookies[0]).to.have.property('value', '123ABC')
            expect(cookies[0]).to.have.property('httpOnly', false)
            expect(cookies[0]).to.have.property('secure', false)

        })
    })

    it('cy.clearCookie() - clear a browser cookie', () => {
        cy.getCookie('token').should('be.null')

        cy.get('#clearCookie .set-a-cookie').click()

        cy.getCookie('token').should('have.property', 'value', '123ABC')

        cy.clearCookie('token').should('be.null')

        cy.getCookie('token').should('be.null')
    })

    it('cy.clearCookies() - clear browser cookies', () => {
        cy.getCookies().should('be.empty')

        cy.get('#clearCookies .set-a-cookie').click()

        cy.getCookies().should('have.length', 1)

        cy.clearCookies()

        cy.getCookies().should('be.empty')
    })

})