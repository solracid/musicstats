var Keystone = require('keystone');

beforeAll(()=> {
    Keystone.init({
        'name': 'Keystone CMS',
        'cookie secret': 'My_Biscuit',
      });
    Keystone.start();
})

describe('Test Keystone CMS own features', () => {

    test('Keystone connects to MongoDB', () => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
    });
});

// afterAll(()=> {
//     Keystone.keystone.closeDatabaseConnection(()=>{})
// })