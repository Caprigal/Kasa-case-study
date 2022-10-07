import { dateFromToday } from '../../../utility'
/// <reference types="cypress" />

const locations = ['Austin, TX', 'Miami Beach, FL', 'Dallas, TX', 'Tokyo, Japan', 'Washington Area, DC']
locations.forEach((location) => {
  describe(`Kasa web application @${location}`, () => {
    /* Where 0 is today, 1 is tomorrow... */
    const dateToTest = [
      [0, 1],
      [1, 2],
      [5, 6],
      [20, 21],
      [100, 101],
      [250, 251],
    ]

    dateToTest.forEach((date) => {
      let firstDate = dateFromToday(date[0])
      let secondDate = dateFromToday(date[1])

      it(`let the user to set date and search for Kasa @${firstDate['month']}/${firstDate['day']}/${firstDate['year']}-${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`, () => {
        /* Open Kasa */
        cy.visit('https://kasa.com/')

        /*
        cy.get('[date="' + firstDate['year'] + '-' + firstDate['month'] + '-' + firstDate['day'] + '"]')
          .focus()
          .then(($elem) => {
            $elem[0].click()
          })


        cy.get('[date="' + secondDate['year'] + '-' + secondDate['month'] + '-' + secondDate['day'] + '"]').then(($elem) => {
          $elem[0].click()
        })
        */

        /* Set date */
        cy.get('#full-screen-hero-check-in-input').type(`${firstDate['month']}/${firstDate['day']}/${firstDate['year']}`)
        cy.get('#full-screen-hero-check-out-input').type(`${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`)

        /* Open location list */
        cy.get('#full-screen-hero-search-input').click()

        /* simpe click() was not worked for different locations */
        cy.get('.listbox-items__item')
          .contains(location)
          .then(($loc_elem) => {
            /* Click location */
            $loc_elem[0].click()
          })

        /* Click search button */
        cy.get('#search-widget .text-container').then(($elem) => {
          $elem.click()
        })
      })

      it(`doesn't let the user to book a single night@${firstDate['month']}/${firstDate['day']}/${firstDate['year']}-${secondDate['month']}/${secondDate['day']}/${secondDate['year']}`, () => {
        /* Validate if we are not able to book single night at the searched locations */
        
        /* First wait until the elements are loaded */
        cy.get('.property-card__name').first().should('exist')
        /* Then validate booking element is not there */
        cy.get('.recommended-room-type').should('not.exist')
      })
    })

    it(`displays "Heating" in the amenities list @${location}`, () => {
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
