const Keystone = require('../common').keystone;
const assert = require('../common').assert;

it('New Models can be saved and retrieved', function(done){

  let Recipe = Keystone.list('recipes');
   
  let curryWurst = new Recipe.model({
    name: 'Curry Wurst',
    author: 'admin',
    createdAt: new Date (2019, 3, 15),
    ingredientList: 'Curry and Sausages',
    cookingInstructions: 'Serve it hot'
  });  

  curryWurst.save(function(err) {
    if (err) return console.error(err);
  });

  Recipe.model.find({ name: /^Curry Wurst/}, ('name author createdAt ingredientList cookingInstructions'), function (err, recipe) {
    if (err) return next(err);
    
    assert.equal(recipe.name, 'Curry Wurst');
    assert.equal(recipe.author, 'admin');
    assert.equal(recipe.createdAt, new Date (2019, 3, 15));
    assert.equal(recipe.ingredientListingredientList, 'Curry and Sausages');
    assert.equal(recipe.cookingInstructions, 'Serve it hot');
  });  
});

