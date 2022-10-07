import { dateFromToday } from '../../../utility'
/// <reference types="cypress" />

describe('In Kasa web application', () => {
  beforeEach(() => {
    /* Open Kasa */
    cy.visit('https://kasa.com/')

    /* Open location list */
    cy.get('#full-screen-hero-search-input').click()
  })

  /* Where 0 is today, 1 is tomorrow... */
  const dateToTest = [
    [-2, -1],
    [-20, -10],
    [-10, -20],
    [-100, -200],
    [-500, -501],
  ]

  dateToTest.forEach((date) => {
    let firstDate = dateFromToday(date[0])
    let secondDate = dateFromToday(date[1])

    it(`type - date picker should let the user book only for future date - @${firstDate['month']}/${firstDate['day']}/${firstDate['year']}-${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`, () => {
      cy.get('.listbox-items__item')
        .first()
        .click()
        .then(() => {
          /* Open date picker */
          cy.get('#full-screen-hero-check-in-input').type(`${firstDate['month']}/${firstDate['day']}/${firstDate['year']}`)
          cy.get('#full-screen-hero-check-out-input').type(`${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`)

          /* Click search button */
          cy.get('#search-widget .text-container').then(($elem) => {
            $elem.click()
          })

          /* Validate if error message is displayed */
          cy.get('#full-screen-hero-invalid-dates-error').should('exist')
        })
    })

    it(`select - date picker should let the user book only for future date - @${firstDate['month']}/${firstDate['day']}/${firstDate['year']}-${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`, () => {
      cy.get('.listbox-items__item')
        .first()
        .click()
        .then(() => {
          /* Open date picker */
          cy.get('#full-screen-hero-check-in-input').click()

          if (date[0] < -30) {
            cy.get(`[date="${firstDate['year']}-${firstDate['month']}-${firstDate['day']}"]`).should('not.exist')

            cy.get(`[date="${secondDate['year']}-${secondDate['month']}-${secondDate['day']}"]`).should('not.exist')
          } else {
            cy.get(`[date="${firstDate['year']}-${firstDate['month']}-${firstDate['day']}"]`).should('be.disabled')

            cy.get(`[date="${secondDate['year']}-${secondDate['month']}-${secondDate['day']}"]`).should('be.disabled')
          }
        })
    })
  })
})
