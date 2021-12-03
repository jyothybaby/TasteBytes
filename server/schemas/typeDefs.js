const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        recipeCount: Int
        savedRecipes: [Recipe]
        savedInventories: [Inventory]
        inventoryCount: Int
    }
    type Recipe {
        recipeId: ID!
        ingredientLines: [String]
        source: String
        image: String
        link: String
        title: String!
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
      }
    type Inventory {
          _id:ID!
          inventoryLines: [String]  
      }

    input InventoryInput {
        inventoryLines: [String]  
      }
    

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveRecipe(recipeData: RecipeInput!): User
        saveInventory(inventoryData: InventoryInput!): User
        removeRecipe(recipeId: ID!): User
    }

`;


module.exports = typeDefs;