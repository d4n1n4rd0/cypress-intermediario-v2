Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {}, //true para restaurar o cache da sessão qndo não é necessario fazer o login pela interface
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in') //Se o location não for igual ao '/users/sign_in' restaura a sessão
  }

  const options = {
    cacheAcrossSpecs: true, //compartilhar a sessão entre as specs
    validate,
  }

  if (cacheSession) { //se tiver cacheSession true, executa a sessão
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add("logout", () => {
  cy.get(".qa-user-avatar").click()
  cy.get('[data-qa-selector="sign_out_link"]').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name)
  cy.get('#project_description').type(project.description)
  cy.get('.qa-initialize-with-readme-checkbox').check()
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})