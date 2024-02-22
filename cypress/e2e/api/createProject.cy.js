import { faker } from '@faker-js/faker'
const token = `Bearer ${Cypress.env('gitlab_access_token')}`

describe('Create Project - API', () => {
    it('successfully', () => {
        const project = {
            name: `project-API-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.request({
            method: 'POST',
            url: '/api/v4/projects/',
            body: {name: project.name, 
                   description: project.description, 
                   initialize_with_readme: true},
            headers:{Autorization: token}

        }).then(response =>{
            expect(response.status).to.equal(201)
            expect(response.body.name).to.equal(project.name)
            expect(response.body.description).to.equal(project.description)
        })
    })
})