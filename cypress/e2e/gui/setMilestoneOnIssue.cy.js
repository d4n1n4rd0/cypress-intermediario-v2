import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }

//Aula 09 - Adicionando um milestone ao issue

describe('Set milestone on issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
          name: `project-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
      }
    
      const milestone = {
        title: `milestone-${faker.random.word()}`,
      }
    
      beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
          .then(response => {
            cy.api_createMilestone(response.body.project_id, milestone)
            console.log(response.body)
            cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
          })
      })
    
      it('successfully', () => {
        cy.gui_setMilestoneOnIssue(milestone)
    
        cy.get('.milestone').should('contain', milestone.title)
        //cy.get('.qa-labels-block span')
        //  .should('have.attr', 'style', `background-color: ${label.color}; color: #FFFFFF;`)
      })
    })