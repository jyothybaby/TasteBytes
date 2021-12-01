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
