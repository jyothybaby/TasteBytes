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
        image
        source
        title
        link
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
