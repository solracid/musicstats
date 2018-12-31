
var keystone = require('keystone');
var Types = keystone.Field.Types;
var path = require('path');

//Create Recipies List
var Recipe = new keystone.List('recipies', {
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
Recipe.add({
  name: { 
    type: String, 
    required: true },
  state: { 
    type: Types.Select, 
    options: 'draft, published, archived', 
    default: 'draft' },
  author: { 
    type: Types.Relationship, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now },
  publishedAt: Date,
  image: {
    type: Types.File,
    storage: recipeImgStorage,
    mimetype: '.jpeg, .jpg, .gif, .svg',
  },
  ingredientList: { 
    type: Types.Html, 
    wysiwyg: true, 
    height: 150 
  },
  cookingInstructions: {
    type: Types.Html,
    wysiwyg: true,
    height: 500
  }
});

// Setting the default order of the columns on the admin tab
Recipe.defaultColumns = 'name, state|20%, author, publishedAt|15%';
Recipe.register();