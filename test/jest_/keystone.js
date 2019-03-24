const Keystone = require('keystone');

beforeAll((done)=> {
    console.log('beforeAll');
    Keystone.init({
        'name': 'Keystone CMS',
        'mongo': 'mongodb://127.0.0.1:27017/jest_${process.env.TEST_SUITE}',
        'cookie secret': 'My_Biscuit',
    });
    console.log('beforeAll 2'); 
    Keystone.start({
        onMount: function() {
            console.log('KeystoneJS mounted');
        },
        onStart: function() {
            console.log('KeystoneJS mounted');  
        },
        onHttpServerCreated: function() {
            console.log('KeystoneJS mounted');
        },
        onHttpsServerCreated: function() {
            console.log('KeystoneJS mounted');
        }
    });
    console.log('beforeAll 3');

    return done();
}, 1000)


afterAll((done)=> {
    Keystone.closeDatabaseConnection(()=>{})
    return done();
});

describe('Test Keystone CMS own features', () => {

    beforeAll(async() => {
        Keystone.import('../server/models');
    });

    test('Keystone connects to MongoDB', (done) => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
        expect(Keystone.mongoose.connecions.length).toBeGreaterThan(0);
    });
});

describe('Mongoose handles the Data', () => {
    
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

});

