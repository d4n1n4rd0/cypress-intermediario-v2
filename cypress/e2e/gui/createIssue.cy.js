import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
    beforeEach(() => {
      cy.login()
    })

  //Aula 05 - Testando criação de issue

    it('successfully', () => {
    const issue = {
        name: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
        }
      
    cy.gui_createIssue(issue)

    cy.contains(issue.name).should('be.visible')
    cy.contains(issue.description).should('be.visible')
    
    })
  })
  