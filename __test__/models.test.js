beforeEach(async() => {
    Keystone.import('.../server/models');
});

test('Keystone can import new Schemas', () => {
    expect(Keystone.list('recipe')).toBeDefined;
    expect(Keystone.list('User')).toBeDefined;
});

test('New Models can have documents', async(done) => {
    
    let Recipe = Keystone.list('recipe');
    
    await new Recipe.model({
        name: 'Currywurst',
        state: 'draft',
        author: 'solracid',
        createdAt: new Date('2019-03-22'),
        ingredientList: 'A sausage and curry',
        cookingInstructions: 'Add Chips'
    }).save(done);
    
    const fetchedRecipe = await Recipe.findOne({ name: 'Currywurst' })
    
    expect(fetchedRecipe.name).toEqual('Currywurst')
    expect(fetchedRecipe.state).toEqual('draft')
    expect(fetchedRecipe.author).toEqual('solracid')
    expect(fetchedRecipe.createdAt).toEqual('2019, 03, 22')
    expect(fetchedRecipe.ingredientList).toEqual('A sausage and curry')
    expect(fetchedRecipe.cookingInstructions).toEqual('Add Chips')
});