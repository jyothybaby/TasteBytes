const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        recipeCount: Int
        savedRecipes: [Recipe]
    }
    type Recipe {
        recipeId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    type Auth {
        token: ID!
        user: User
      }

    input RecipeInput {
        authors: [String]
        description: String!
        recipeId: String!
        image: String
        link: String
        title: String!
      }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveRecipe(recipeData: RecipeInput!): User
        removeRecipe(recipeId: ID!): User
    }

`;


module.exports = typeDefs;