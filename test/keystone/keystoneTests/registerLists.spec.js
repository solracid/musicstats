const Keystone = require('../common').keystone;
const assert = require('../common').assert;

it('Schemas can be registered in Keystone Lists', function(done) {

    let Recipe = Keystone.list('recipes');
 
    assert.isObject(Recipe);
    assert.isTrue(!Recipe.isNew)
    assert.property(Recipe, "path");     
    assert.isObject(Recipe.obj.name);
    assert.isObject(Recipe.path, "ingredientList");
 
    done();
  });