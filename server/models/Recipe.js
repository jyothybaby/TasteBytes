const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedRecipes` array in User.js
const recipeSchema = new Schema({
  ingredientLines: [
    {
      type: String,
    },
  ],
  source: {
    type: String,
    required: true,
  },
  // saved recipe id from Thirdparty Api
  recipeId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  ingredients:[ {
    type: String,
  }
],
  title: {
    type: String,
    required: true,
  },
});

module.exports = recipeSchema;
