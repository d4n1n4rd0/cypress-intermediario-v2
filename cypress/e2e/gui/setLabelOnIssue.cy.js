import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }

//Aula 08 - Adicionando uma label ao issue

describe('Set label on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
          name: `project-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
      }
    
      const label = {
        name: `label-${faker.random.word()}`,
        color: '#8E44AD'
      }
    
      beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
          .then(response => {
            cy.api_createLabel(response.body.project_id, label)
            console.log(response.body)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
          })
      })
    
      it('successfully', () => {
        cy.gui_setLabelOnIssue(label)
    
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
          .should('have.attr', 'style', `background-color: ${label.color}; color: #FFFFFF;`)
      })
    })