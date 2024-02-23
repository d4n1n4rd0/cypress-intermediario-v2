import { faker } from '@faker-js/faker'
const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

describe('Create Issue', () => {
   
    beforeEach(() => cy.api_deleteProjects()) 
  it('successfully', () => {

    const issue = {
        title: `issue-API-${faker.datatype.uuid()}`,
        description: faker.random.words(3),
        project: {
          name: `project-API-${faker.datatype.uuid()}`,
          description: faker.random.words(5)
        }
      }

    cy.api_createIssue(issue)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
   })
})
