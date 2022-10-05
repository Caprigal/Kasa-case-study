describe('Punk API', () => {
  beforeEach(() => {
    /* get beers and save the body to @beers alias */
    cy.request('https://api.punkapi.com/v2/beers?yeast=Wyeast_3522_-_Belgian_Ardennes&hops=Tomahawk').its('body').as('beers')
  })

  it('returns beer(s) with Wyeast 3522 - Belgian Ardennes yeast and Tomahawk hops', () => {
    cy.get('@beers').then((beers) => {
      /* validate that there is atleast 1 kind of beer with the given yeast and hops */
      expect(beers.length).to.be.at.least(1)
    })
    cy.get('@beers').each((beer) => {
      /* log the expected beer(s) */
      cy.log(beer.name + ' has Wyeast 1056 - American Ale™ and contains Tomahawk hops!')
    })
  })

  it('Beers w/ Wyeast 3522 - Belgian Ardennes yeast + Tomahawk hops should contain single 12.5g Magnum hops', () => {
    cy.get('@beers').each((beer) => {
      /* validate that only 12.5g of Magnum has been added */
      let result = beer.ingredients.hops.filter(({ name, amount }) => name === 'Magnum' && amount.value === 12.5 && amount.unit === 'grams')
      expect(result).to.have.lengthOf(1)

      /* unnecessary, only for the sake of practice */
      expect(result[0].amount.value).to.equal(12.5)
      expect(result[0].amount.unit).to.equal('grams')
    })
  })

  it('IBU content is number for the selected beer(s)', () => {
    cy.get('@beers').each((beer) => {
      /* validate that only IBU content is a type of number */
      assert.isNumber(beer.ibu, 'IBU content is number')
    })
  })

  it('Description is not empty for the selected beer(s)', () => {
    cy.get('@beers').each((beer) => {
      /* validate that the description is not empty */
      expect(beer.description.length).to.be.greaterThan(0)
    })
  })
})

describe('Punk API', () => {
  beforeEach(() => {
    /* get beers and save the body to @beers alias */
    cy.request('https://api.punkapi.com/v2/beers?yeast=American_Ale&hops=Chinook&food=cheese').its('body').as('beers')
  })

  it('can list all the beers w/ any kind of American Ale yeast with Chinook hops, cheese food pairing and bourbon in brewers tip', () => {
    let result = []
    cy.get('@beers')
      .each((beer) => {
        if (beer.brewers_tips.includes('bourbon')) {
          /* push all the beers with bourbon in it's brewers_tip value */
          result.push(beer)
        }
      })
      .then(() => {
        result.forEach((beer) => {
          /* log the beer(s) */
          cy.log(beer.name)
        })
        /* validate there is atleast 1 beer with the given parameters */
        expect(result.length).to.be.greaterThan(0)
      })
  })
})

describe('Punk API', () => {
  /* punk-api-bug-report.txt in the root conains the bug report */
  it('can return multiple hops search', () => {
    cy.request('https://api.punkapi.com/v2/beers?hops=Chinook&hops=Tomahawk').its('body').as('beers')

    cy.get('@beers').each((beer) => {
      cy.log(beer.name)
    })
  })
})
