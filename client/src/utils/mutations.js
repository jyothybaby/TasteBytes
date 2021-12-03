import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeData: RecipeInput!) {
    saveRecipe(recipeData: $recipeData) {
      _id
      username
      email
      savedRecipes {
        recipeId
        ingredientLines
        image
        source
        title
        link
      }
    }
  }
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($recipeId: ID!) {
    removeRecipe(recipeId: $recipeId) {
      _id
      username
      email
      savedRecipes {
        recipeId
        ingredientLines
        image
        source
        title
        link
      }
    }
  }

`;


export const SAVE_INVENTORY = gql`
  mutation saveInventory($inventoryData: InventoryInput!) {
    saveInventory(inventoryData: $inventoryData) {
      _id
      username
      email
      savedInventories {
        inventoryLines
      }
    }
  }
`;
