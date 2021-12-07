const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        recipeCount: Int
        savedRecipes: [Recipe]
        savedInventories: [String]
        inventoryCount: Int
        savedGroceries: [String]
        groceryCount: Int
    }
    type Recipe {
        recipeId: ID!
        ingredientLines: [String]
        source: String
        image: String
        link: String
        title: String!
        ingredients: [String]

    }
    type Auth {
        token: ID!
        user: User
      }

    input RecipeInput {
        ingredientLines: [String]
        source: String!
        recipeId: String!
        image: String
        link: String
        title: String!
        ingredients: [String]

      }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveRecipe(recipeData: RecipeInput!): User
        saveInventory(inventoryData: [String]!): User
        removeInventory(inventoryData: [String]!): User
        saveGrocery(groceryData: [String]!): User
        removeRecipe(recipeId: ID!): User
    }

`;


module.exports = typeDefs;