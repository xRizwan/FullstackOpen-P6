describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'super',
      password: 'super12',
      name: 'superman'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login Form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('Logging with correct credentials', function () {
      cy.get('#username').type('super')
      cy.get('#password').type('super12')
      cy.get('#loginButton').click()
      cy.contains('superman logged-in')
    })

    it('Logging in with incorrect credentials fails', function() {
      cy.get('#username').type('super')
      cy.get('#password').type('fake12')
      cy.get('#loginButton').click()

      cy.contains('Wrong Username or Password')
      cy.get('.notification').should('have.css', 'color', 'rgb(250, 0, 0)')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'super', password: 'super12' })
    })

    it('a new blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Gaming Blog')
      cy.get('#author').type('SuperMan')
      cy.get('#url').type('www.itdoesntexist.com')
      cy.get('#createButton').click()

      cy.contains('Gaming Blog by SuperMan')
    })

    describe('blog can be liked', function () {
      beforeEach(function() {
        cy.contains('New Blog').click()
        cy.get('#title').type('Gaming Blog')
        cy.get('#author').type('SuperMan')
        cy.get('#url').type('www.itdoesntexist.com')
        cy.get('#createButton').click()
      })

      it('blog can be liked', function () {
        cy.get('.displayer').click()

        cy.get('.likeButton').click()
        cy.get('.likes').contains('1')
      })

      it('blog can be deleted', function () {
        cy.get('.displayer').click()
        cy.get('.deleteButton').click()

        cy.get('.blogInfo').should('not.contain', 'Gaming Blog')
      })
    })

    describe('blogs are ordered by likes', function () {
      beforeEach(function () {
        cy.addBlog({ title: 'cat', author: 'animal', url: 'jungl', likes: 0  })
        cy.addBlog({ title: 'simple', author: 'someone', url: 'nowhere', likes: 50 })
        cy.addBlog({ title: 'nothing', author: 'noone', url: 'nowhere', likes: 20 })
      })

      it('blogs are ordered from highest liked to lowest liked', function() {
        cy.get('.blog').then(blogs => {
          console.log('number of blogs', blogs.length)
          cy.wrap(blogs[0]).contains('simple')
          cy.wrap(blogs[1]).contains('nothing')
          cy.wrap(blogs[2]).contains('cat')
        })
      })
    })
  })
})