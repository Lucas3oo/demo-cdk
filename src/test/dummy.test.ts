const expect = require('chai').expect

describe('No assertion', function() {
  it('doesnt test anything', function() { // Noncompliant
    const str = ''
    console.log(str)
  })
})
