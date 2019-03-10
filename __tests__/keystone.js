let Keystone = require('keystone');

describe('Test Keystone CMS own features', () => {
    test('Keystone connects to MongoDB', () => {
        expect(Keystone.mongoose.connections._listening).toBeTruthy;
    });
});