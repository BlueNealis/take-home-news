describe('Detail View', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`, {
      fixture: '../fixtures/worldNYT.json'
    })
    cy.get('card').eq(1).within(() => {
      cy.get('h1').click()
    })
    cy.intercept(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_API_KEY}`, {
      fixture: '../fixtures/detail'
    })
  })

  it.only('Should details of the detail view the user pressed', () => {
    cy.get('article-container').within(() => {
      cy.get('main-title').should('eq', 'What’s Driving the Protests in Iran?')
      cy.get('abstract').should('eq', 'Dozens of cities have been embroiled in protests that were prompted by a young woman’s death in custody but have escalated amid anger over religious rules and a rock-bottom economy.')
      cy.get('author').should('eq', 'By Cora Engelbrecht and Farnaz Fassihi')
    })

  })

  it('Should redirect to the NY times article when the user presses the button',() =>  {
    cy.get('article-container').within(() => {
      cy.get('button').click()
      cy.url().should('eq', 'https://www.nytimes.com/2022/09/22/world/middleeast/iran-protests.html')
    })

  })

  it('Should go back to home page when the user presses Back To Main' () => {
    cy.url().should('eq', '')
    cy.get('redirect-main').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

})
