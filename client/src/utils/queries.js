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
      savedInventories 
    }
  }
`;

export const QUERY_INVENTORY = gql`
  {
    me {
      _id
      username
      email
      savedInventories
    }
  }
`;

export const QUERY_GROCERY = gql`
  {
    me {
      _id
      username
      email
      savedGroceries 
    }
  }
`;
