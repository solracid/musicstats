
var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

//Create Recipies List
var Recipies = new keystone.List('recipies', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt',
  });

//Store IMGs
var recipeImgStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        // required; path where the files should be stored
       path: keystone.expandPath('server/public/img'),
       generateFilename: function (file, index) {
         return file.originalname;
       },
       whenExists: 'error',
        // path where files will be served
       publicPath: '/public/img',
     },
});

//Add Recipies-Model fields
Recipies.add({
    name:{ Type: Types.Name, required: true, index: true },

});