import { dateFromToday, getRandomLocations } from '../../../utility'
/// <reference types="cypress" />

describe('In Kasa web application', () => {
  beforeEach(() => {
    /* Here it's possible to set how many location we would like to test */
    const iteration = 5

    /* Open Kasa */
    cy.visit('https://kasa.com/')

    /* Open location list */
    cy.get('#full-screen-hero-search-input').click()

    /* Get random locations, and save it to locations alias (Austin, TX hardcoded) */
    cy.get('.listbox-items__item')
      .then(($elements) => {
        return getRandomLocations(iteration, $elements)
      })
      .as('locations')
  })

  it('search works, single-night booking is not possible, "Heating" in the amenities list', () => {
    const firstDate = dateFromToday(0)
    const secondDate = dateFromToday(1)

    cy.get('@locations').each((loc) => {
      /* get the location from the list */
      cy.get('.listbox-items__item')
        .contains(loc)
        .then(($loc_elem) => {
          /* Click location */
          $loc_elem[0].click()

          /* Open date picker */
          cy.get('#full-screen-hero-check-in-input').then(($elem) => {
            $elem[0].click()
          })

          /* Set date (hocus-focus) */
          cy.get('[date="' + firstDate['year'] + '-' + firstDate['month'] + '-' + firstDate['day'] + '"]')
            .focus()
            .then(($elem) => {
              $elem[0].click()
            })

          /* Set date */
          cy.get('[date="' + secondDate['year'] + '-' + secondDate['month'] + '-' + secondDate['day'] + '"]').then(($elem) => {
            $elem[0].click()
          })

          /* Click search button */
          cy.get('#search-widget .text-container').then(($elem) => {
            $elem.click()
          })

          /* Validate if we are not able to book single night at the searched locations */
          cy.get('.recommended-room-type').should('not.exist')

          /* Validate if the searched Kasa contains Heating in amenities list */
          cy.get('.property-card__name').each((kasa) => {
            cy.get(kasa)
              .then(($elem) => {
                $elem.click()
              })
              .then(() => {
                cy.get('.room-type-card__header-title').each((room) => {
                  cy.get(room).click()

                  cy.get('.room-type-popup__amenities-list')
                    .first()
                    .then(($elem) => {
                      let amenities = []
                      cy.get($elem[0])
                        .find('li')
                        .each((amenity) => {
                          amenities.push(amenity[0].innerText.trim())
                        })
                        .then(() => {
                          expect(amenities.filter((am) => am === 'Heating')).to.have.lengthOf(1)
                          amenities = []

                          cy.get('#room-type-header__close-button').click()
                        })
                    })
                })
                cy.go('back')
              })
          })

          /* Get back to Home */
          cy.get('.logo-wrapper').then(($elem) => {
            $elem[0].click()
          })
          cy.get('#full-screen-hero-search-input').focus().clear()
        })
    })
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
