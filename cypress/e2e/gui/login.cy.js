describe('Login', () => {
  it('successfully', () => {
  //Aula 01 - Setup da aplicação e do projeto de testes automatizados
  //Aula 02 - Testando a funcionalidade de login
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: false }

    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })
})