const Keystone = require('keystone');

beforeAll(async()=> {
    Keystone.init({
        'name': 'Keystone CMS',
        'cookie secret': 'My_Biscuit',
      });
    await Keystone.start();
})

afterAll(()=> {
    Keystone.closeDatabaseConnection(()=>{})
});

describe('Test Keystone CMS own features', () => {

    test('Keystone connects to MongoDB', () => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
        expect(Keystone.mongoose.connecions.length).toBeGreaterThan(0);
    });
    
    test('Keystone imports custom Schemas', () => {
        keystone.import('./server/models');
        
        expect(Keystone.list('recipe')).toBeDefined;
        expect(Keystone.list('User')).toBeDefined;
    });
});

