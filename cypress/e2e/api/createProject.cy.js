import { faker } from '@faker-js/faker'
const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

describe('Create Project', () => {
        beforeEach(() => cy.api_deleteProjects())
    
  it('successfully', () => {
    const project = {
      name: `project-API-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
      })
   })
})
