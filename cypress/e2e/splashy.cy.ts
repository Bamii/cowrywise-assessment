// https://on.cypress.io/api

describe('splashy test', () => {
  it('displays the homepage', () => {
    cy.intercept('https://api.unsplash.com/search/photos/*').as('my_photos')
    cy.visit('/')
    cy.wait(['@my_photos'])
    
    cy.get("input#search-input")
    cy.get("#columns-container")
      .find("img")
      // .should("have.lengthOf", 10)
  });

  it('renders correctly when query is in url', () => {
    cy.intercept('https://api.unsplash.com/search/photos/*').as('my_photos')
    cy.visit('/?search=dog')
    // cy.wait(['@my_photos'])
    
    cy.get("#search-quote-container")
    cy.get("#columns-container")
      .find("img")
  })

  it('renders correctly when wrong query is in url', () => {
    cy.intercept('https://api.unsplash.com/search/photos/*').as('my_photos')
    cy.visit('/?seark=dog')
    cy.wait(['@my_photos'])
    
    cy.get("input#search-input")
    cy.get("#columns-container")
      .find("img")
  })
  
  it('loads more images when you scroll to the bottom', () => {
    cy.intercept('https://api.unsplash.com/search/photos/*').as('my_photos')
    cy.visit('/?seark=dog')
    cy.wait(['@my_photos'])
    
    cy.get("input#search-input")
    cy.get("#columns-container")
      .find("img")
  })
})
