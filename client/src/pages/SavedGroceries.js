import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROCERY } from '../utils/queries';
import { SAVE_INVENTORY } from '../utils/mutations';

const SavedGroceries = () => {
    const { loading, data } = useQuery(QUERY_GROCERY);
    const [saveInventory, { error }] = useMutation(SAVE_INVENTORY);
    
    const userData = data?.me || {};
   
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    const handleSavetoInventory = async (shoppingList) => {
      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
      try {
        const { data } = await saveInventory({
          variables: { inventoryData: shoppingList},
        });
        
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h5>Viewing {userData.username}'s Shopping List!</h5>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedGroceries?.length
              ? `Viewing ${userData.savedGroceries?.length} saved ${
                userData.savedGroceries?.length === 1 ? 'grocery' : 'groceries'
                }:`
              : 'You have not saved any groceries!'}
          </h2>
          
            {userData.savedGroceries?.map((item) => {
              return (
                <ul>
                    <li className="small">{item}</li>               
                  </ul>
                 );
            })}
           { userData.savedGroceries?.length > 0 ?
            <Button 
                      onClick={() => handleSavetoInventory(userData.savedGroceries)}
                    >Already Bought? Add To Inventory List.
            </Button> : null
            }
        </Container>
      </>
    );
  };
  
  export default SavedGroceries;
