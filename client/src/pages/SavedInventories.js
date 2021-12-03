import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_INVENTORY } from '../utils/queries';

const SavedInventories = () => {
    const { loading, data } = useQuery(QUERY_INVENTORY);
    
    const userData = data?.me || {};
   
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing {userData.username}'s inventories!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {userData.savedInventories[0]?.inventoryLines?.length
              ? `Viewing ${userData.savedInventories[0]?.inventoryLines?.length} saved ${
                  userData.savedInventories[0]?.inventoryLines?.length === 1 ? 'inventory' : 'inventories'
                }:`
              : 'You have not saved any inventories!'}
          </h2>
          
            {userData.savedInventories[0]?.inventoryLines.map((item) => {
              return (
                <ul>
                    <li className="small">{item}</li>               
                  </ul>
                 );
            })}
          
        </Container>
      </>
    );
  };
  
  export default SavedInventories;
