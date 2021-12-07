import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_INVENTORY } from '../utils/queries';
import { REMOVE_INVENTORY } from '../utils/mutations';

const SavedInventories = () => {
    const { loading, data } = useQuery(QUERY_INVENTORY);
    const [removeInventory] = useMutation(REMOVE_INVENTORY);
    
    const userData = data?.me || {};
   
    if (loading) {
      return <h2>LOADING...</h2>;
    }

    
    const handleRemoveInventory = async () => {

      // Get all the items to be removed from inventory
      var notInStock = [];
      var markedCheckbox = document.getElementsByName('invItemChkbox');  
      for (var checkbox of markedCheckbox) {  
        if (checkbox.checked)  
          notInStock.push(checkbox.value);   
      }

      // get token
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
      try {
        await removeInventory({
          variables: { inventoryData: notInStock},
        });

        //workaround to reset the state
        markedCheckbox = document.getElementsByName('invItemChkbox');  
        for (var chkbox of markedCheckbox) {  
          chkbox.checked = false;  
        }

        alert('Inventory list updated successfully')
        
      } catch (err) {
        alert('Error occured')
        console.error(err);
      }
    };
  
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h5>Viewing {userData.username}'s inventories!</h5>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedInventories?.length
              ? `Viewing ${userData.savedInventories?.length} saved ${
                  userData.savedInventories?.length === 1 ? 'inventory' : 'inventories'
                }:`
              : 'You have not saved any inventories!'}
          </h2>
          <div>
            {userData.savedInventories?.map((item, index) => 
              <div key={index}>
                <input type='checkbox' name='invItemChkbox' value={item}/> {item}
              </div>
            )}
          </div>
          { userData.savedInventories?.length > 0 ?
            <Button 
                      onClick={() => handleRemoveInventory()}
                    >Out of Stock? Remove From Inventory List.
            </Button> : null
            }
        </Container>
      </>
    );
  };
  
  export default SavedInventories;
