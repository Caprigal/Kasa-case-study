Kasa - QA Engineer case study

# UI test v1
pros
- more dynamic solution since the test candidate locations are not hardcoded, they are chosen randomly
- scalable, length of testable locations can be set by parameter
cos
- unstable, memory issues
- was unable to iterate the 'it' parts (test cases), so the whole run is inside one 'it'

# UI test v2
pros
- more stable solution
- cypress testcases displayed as expected
cos
- hardcoded solution, require lot of code repetition in case of scaling

## Installing cypress

[![npm version](https://badge.fury.io/js/cypress.svg)](https://badge.fury.io/js/cypress)

Install Cypress for Mac, Linux, or Windows

```bash
npm install cypress --save-dev
```
or
```bash
yarn add cypress --dev
```

## To run

Node.js 12 or 14 and above

```bash
npx cypress open
```

Or by using yarn

```bash
yarn run cypress open
```
