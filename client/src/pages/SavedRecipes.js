import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//import { getMe, deleteRecipe } from '../utils/API';
import Auth from '../utils/auth';
import { removeRecipeId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_RECIPE } from '../utils/mutations';

const SavedRecipes = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeRecipe, { error }] = useMutation(REMOVE_RECIPE);

  const userData = data?.me || {};

  

  // create function that accepts the recipe's mongo _id value as param and deletes the recipe from the database
  const handleDeleteRecipe = async (recipeId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await removeRecipe({
        variables: { recipeId },
      });
      // upon success, remove recipe's id from localStorage
      removeRecipeId(recipeId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s recipes!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedRecipes?.length
            ? `Viewing ${userData.savedRecipes.length} saved ${
                userData.savedRecipes.length === 1 ? 'recipe' : 'recipes'
              }:`
            : 'You have not saved any recipes!'}
        </h2>
        <CardColumns>
          {userData.savedRecipes?.map((recipe) => {
            return (
              <Card key={recipe.recipeId} border="dark">
                {recipe.image ? (
                  <Card.Img
                    src={recipe.image}
                    alt={`The cover art for ${recipe.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <ul>
                    {recipe.ingredientLines.map(line=>(<li>{line}</li>))}
                  </ul>
                  <Card.Text><b>Ingredients:</b> {recipe.ingredients.join(', ')}</Card.Text>
                  <Card.Text><b>Source:</b> {recipe.source}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteRecipe(recipe.recipeId)}
                  >
                    Delete this Recipe!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedRecipes;
