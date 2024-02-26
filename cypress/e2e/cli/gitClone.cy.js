import { faker } from '@faker-js/faker'

//Aula 10 - Testando a funcionalidade de adição de um marco à uma issue

describe('git clone', () => {
  const project = {
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => {
    cy.api_deleteProjects()
    cy.api_createProject(project)
  })

  it.skip('successfully', () => {
    cy.cloneViaSSH(project)

    cy.readFile(`cypress/downloads/${project.name}/README.md`)
      .should('contain', `# ${project.name}`)
      .and('contain', project.description)
  })
})
