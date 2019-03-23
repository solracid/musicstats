const Keystone = require('keystone');

beforeAll(async()=> {
    Keystone.init({
        'name': 'Keystone CMS',
        'mongo': 'mongodb://127.0.0.1:27017/jest_${process.env.TEST_SUITE}',
        'cookie secret': 'My_Biscuit',
      });
    await Keystone.start();
})

afterAll((done)=> {
    Keystone.closeDatabaseConnection(()=>{})
    return done()
});

describe('Test Keystone CMS own features', () => {

    test('Keystone connects to MongoDB', (done) => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
        expect(Keystone.mongoose.connecions.length).toBeGreaterThan(0);
    });
});

describe('Mongoose handles the Data', () => {
    
    beforeAll(async() => {
        keystone.import('./server/models');
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
            createdAt: new Date(2019, 03, 22),
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

});

