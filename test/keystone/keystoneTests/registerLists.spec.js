const Keystone = require('../common').keystone;
const assert = require('../common').assert;

it('Schemas are registered as Lists', function(done) {

    let Recipe = Keystone.list('recipes');
 
    assert.isObject(Recipe);
    assert.isTrue(!Recipe.isNew)
    assert.property(Recipe, "path");     
    assert.property(Recipe, "schema");
 
    done();
  });
