describe('Logout', () => {
    beforeEach(() => {
      cy.login()
      cy.visit('/')
    })

    //Aula 03 - Testando a funcionalidade de logout
    it('successfully', () => {
      cy.logout()
     
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
  })