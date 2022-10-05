import { dateFromToday, getRandomLocations } from '../../../utility'
/// <reference types="cypress" />

describe('In Kasa web application', () => {
  beforeEach(() => {

    /* Open Kasa */
    cy.visit('https://kasa.com/')

    /* Open location list */
    cy.get('#full-screen-hero-search-input').click()

  })

  it('date picker should let the user book only for future date', () => {
    const firstDate = dateFromToday(-2)
    const secondDate = dateFromToday(-1)

    cy.get('.listbox-items__item')
      .first()
      .click()
      .then(() => {
        /* Open date picker */
        cy.get('#full-screen-hero-check-in-input').type(firstDate['month'] + '/' + firstDate['day'] + '/' + firstDate['year'])
        cy.get('#full-screen-hero-check-out-input').type(secondDate['month'] + '/' + secondDate['day'] + '/' + secondDate['year'])

        /* Click search button */
        cy.get('#search-widget .text-container').then(($elem) => {
          $elem.click()
        })

        /* Validate if error message is displayed */
        cy.get('#full-screen-hero-invalid-dates-error').should('exist')
      })
  })

  it('date picker should let the user book only for future date #2', () => {
    const firstDate = dateFromToday(-20)
    const secondDate = dateFromToday(-10)

    cy.get('.listbox-items__item')
      .first()
      .click()
      .then(() => {
        /* Open date picker */
        cy.get('#full-screen-hero-check-in-input').type(firstDate['month'] + '/' + firstDate['day'] + '/' + firstDate['year'])
        cy.get('#full-screen-hero-check-out-input').type(secondDate['month'] + '/' + secondDate['day'] + '/' + secondDate['year'])

        /* Click search button */
        cy.get('#search-widget .text-container').then(($elem) => {
          $elem.click()
        })

        /* Validate if error message is displayed */
        cy.get('#full-screen-hero-invalid-dates-error').should('exist')
      })
  })

  it('date picker should let the user book only for future date #3', () => {
    const firstDate = dateFromToday(-10)
    const secondDate = dateFromToday(-20)

    cy.get('.listbox-items__item')
      .first()
      .click()
      .then(() => {
        /* Open date picker */
        cy.get('#full-screen-hero-check-in-input').type(firstDate['month'] + '/' + firstDate['day'] + '/' + firstDate['year'])
        cy.get('#full-screen-hero-check-out-input').type(secondDate['month'] + '/' + secondDate['day'] + '/' + secondDate['year'])

        /* Click search button */
        cy.get('#search-widget .text-container').then(($elem) => {
          $elem.click()
        })

        /* Validate if error message is displayed */
        cy.get('#full-screen-hero-invalid-dates-error').should('exist')
      })
  })
})
