import { faker } from '@faker-js/faker'
const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

describe('Create Project', () => {
    beforeEach(() => {
        cy.request({
            method: 'GET',
            url: `/api/v4/projects/`,
            headers: { Authorization: accessToken }
          }).then((response) =>{
            response.body.forEach(project => {
                cy.request({
                    method: 'DELETE',
                    url: `/api/v4/projects/${project.id}`,
                    headers: { Authorization: accessToken },
                })
            })
          })
    })
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
        console.log(response.body)
      })
  })
}) 
  