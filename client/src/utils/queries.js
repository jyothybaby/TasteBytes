import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedRecipes {
        recipeId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
