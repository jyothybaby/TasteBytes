import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedRecipes {
        recipeId
        ingredientLines
        ingredients
        image
        source
        title
        link
      }
      savedInventories {
        inventoryLines
      }
    }
  }
`;

export const QUERY_INVENTORY = gql`
  {
    me {
      _id
      username
      email
      savedInventories {
        inventoryLines
      }
    }
  }
`;
