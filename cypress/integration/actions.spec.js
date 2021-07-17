context('Actions', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions')
    })

    it('.type() - type into a DOM element', () => {
        cy.get('.action-email')
            .type('fake@email.com').should('have.value', 'fake@email.com')


            .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
            .type('{del}{selectall}{backspace}')

            // .type() with key modifiers
            .type('{alt}{option}') //these are equivalent
            .type('{ctrl}{control}') //these are equivalent
            .type('{meta}{command}{cmd}') //these are equivalent
            .type('{shift}')

            // Delay each keypress by 0.1 sec
            .type('slow.typing@email.com', {delay: 100})
            .should('have.value', 'slow.typing@email.com')

        cy.get('.action-disabled')
            .type('disabled error checking', {force: true})
            .should('have.value', 'disabled error checking')
    })

    it('.focus() - focus on a DOM element', () => {
        cy.get('.action-focus').focus()
            .should('have.class', 'focus')
            .prev().should('have.attr', 'style', 'color: orange;')
    })

    it('.blur() - blur off a DOM element', () => {
        cy.get('.action-blur').type('About to Blur').blur()
            .should('have.class', 'error')
            .prev().should('have.attr', 'style', 'color: red;')
    })
})