context('test', function(){
    it ('visit the page', function(){
        cy.visit('localhost:3000/index.html')
    })
    it ('enters a name', function(){
        cy.get('#name')
        .type('Hello World')
        .should('have.value', 'Hello World')
    })
    it ('enters an email', function(){
        cy.get('#email')
        .type('email@webhost.blah')
        .should('have.value', 'email@webhost.blah')
    })
    it ('enters a password', function(){
        cy.get('#password')
        .type('hunter2')
        .should('have.value', 'hunter2')
    })
    it ('selects a service', function(){
        cy.get('#service')
        .select('hell')
        .should('have.value', 'hell')
    })
    it ('checks the terms and services', function(){
        cy.get('#terms')
        .check()
        .should('have.checked', true)
    })
    it ('submits the form', function(){
        cy.server()
        cy.route('POST', 'https://reqres.in/api/users').as('submitUser')

        cy.get('form')
        .submit()
        .wait('@submitUser')

        cy.get('[cy-data=userlist]')
        .children()
        .should('have.length', 1)
    })
    it('enters an incomplete form', function(){
        cy.visit('localhost:3000/')

        cy.get('#name')
        .type('Hello World')

        cy.get('#password')
        .type('hunter2')

        cy.get('#service')
        .select('hell')

        cy.get('#terms')
        .check()

        cy.get('form')
        .submit()

        .wait(5000)

        cy.get('[cy-data=userlist]')
        .children()
        .should('have.length', 0)
    })
    
})