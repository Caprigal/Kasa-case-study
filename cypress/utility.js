/**
 * Returns an object with the expected date calculated by the current one
 * @param  {Number} expected_day_from_today which day's should it return, 0 is today +1 tomorrow, -1 yday
 * @return {Object}                         Returns the expected date 
 */
export const dateFromToday = (expected_day_from_today = 0) => {
  var today = new Date()
  today.setDate(today.getDate() + expected_day_from_today)

  return { year: today.getFullYear(), month: String(today.getMonth() + 1).padStart(2, '0'), day: String(today.getDate()).padStart(2, '0') }
}

/**
 * Returns random Kasa locations by the given parameters
 * @param  {Number} iteration How many locations we should test
 * @param  {Object} locations Location elements from the application
 * @return {Array}            Returns the test candidate locations in an array
 */
export const getRandomLocations = (iteration, locations) => {
  let test_candidate_locations = ['Austin, TX']
  let rndm
  const locations_length = locations.length - 1
  const min = 0

  let a = 0
  for (a = 0; a < iteration; a++) {
    let a = false
    while (!a) {
      rndm = Math.floor(Math.random() * (locations_length - min + 1) + min) // Max and min are inclusive
      if (!test_candidate_locations.includes(locations[rndm].innerText)) {
        test_candidate_locations.push(locations[rndm].innerText)
        a = true
      }
    }
  }
  return test_candidate_locations
}
