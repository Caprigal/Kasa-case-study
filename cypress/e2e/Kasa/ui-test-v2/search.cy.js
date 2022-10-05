import { dateFromToday, getRandomLocations } from '../../../utility'
/// <reference types="cypress" />

describe('In Kasa web application', () => {
  before(() => {
    /* Open Kasa */
    cy.visit('https://kasa.com/')

    /* Open location list */
    cy.get('#full-screen-hero-search-input').click()
  })

  it('search @Austin, TX', () => {
    cy.get('.listbox-items__item')
      .contains('Austin, TX')
      .then(($loc_elem) => {
        /* Click location */
        $loc_elem[0].click()
      })
  })

  it('set date and search for Kasa @Austin, TX', () => {
    const firstDate = dateFromToday(0)
    const secondDate = dateFromToday(1)

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
  })

  it('can not book to a single night @Austin, TX', () => {
    /* Validate if we are not able to book single night at the searched locations */
    cy.get('.recommended-room-type').should('not.exist')
  })

  it('"Heating" in the amenities list @Austin, TX', () => {
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

  it('search @Miami Beach, FL', () => {
    cy.get('.listbox-items__item')
      .contains('Denver, CO')
      .then(($loc_elem) => {
        /* Click location */
        $loc_elem[0].click()
      })
  })

  it('set date and search for Kasa @Miami Beach, FL', () => {
    const firstDate = dateFromToday(0)
    const secondDate = dateFromToday(1)

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
  })

  it('can not book to a single night @Miami Beach, FL', () => {
    /* Validate if we are not able to book single night at the searched locations */
    cy.get('.recommended-room-type').should('not.exist')
  })

  it('"Heating" in the amenities list @Miami Beach, FL', () => {
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

  it('search @Dallas, TX', () => {
    cy.get('.listbox-items__item')
      .contains('Dallas, TX')
      .then(($loc_elem) => {
        /* Click location */
        $loc_elem[0].click()
      })
  })
  
  it('set date and search for Kasa @Dallas, TX', () => {
    const firstDate = dateFromToday(0)
    const secondDate = dateFromToday(1)

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
  })

  it('can not book to a single night @Dallas, TX', () => {
    /* Validate if we are not able to book single night at the searched locations */
    cy.get('.recommended-room-type').should('not.exist')
  })

  it('"Heating" in the amenities list @Dallas, TX', () => {
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
