import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROCERY } from '../utils/queries';
import { SAVE_INVENTORY } from '../utils/mutations';

const SavedGroceries = () => {
    const { loading, data } = useQuery(QUERY_GROCERY);
    const [saveInventory] = useMutation(SAVE_INVENTORY);
    
    const userData = data?.me || {};
   
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    const handleSavetoInventory = async () => {

      // Get all the items already bought to be added to inventory
      var alreadyBought = [];
      var markedCheckbox = document.getElementsByName('pl');  
      for (var checkbox of markedCheckbox) {  
        if (checkbox.checked)  
          alreadyBought.push(checkbox.value);   
      }

      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
      try {
        await saveInventory({
          variables: { inventoryData: alreadyBought},
        });

        //workaround to reset the state
        markedCheckbox = document.getElementsByName('pl');  
        for (var checkbox of markedCheckbox) {  
          checkbox.checked = false;  
        }
        
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
          <div>
            {userData.savedGroceries?.map((item, index) => 
              <div key={index}>
                <input type='checkbox' name='pl' value={item}/> {item}
              </div>
            )}
          </div>
           { userData.savedGroceries?.length > 0 ?
            <Button 
                      onClick={() => handleSavetoInventory()}
                    >Already Bought? Add To Inventory List.
            </Button> : null
            }
        </Container>
      </>
    );
  };
  
  export default SavedGroceries;
