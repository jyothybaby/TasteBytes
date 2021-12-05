import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROCERY } from '../utils/queries';

const SavedGroceries = () => {
    const { loading, data } = useQuery(QUERY_GROCERY);
    
    const userData = data?.me || {};
   
    if (loading) {
      return <h2>LOADING...</h2>;
    }
  
    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h5>Viewing {userData.username}'s Grocery List!</h5>
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
          
        </Container>
      </>
    );
  };
  
  export default SavedGroceries;
