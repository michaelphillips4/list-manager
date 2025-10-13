
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import List from './List';


export function App() {

  return (
    <> <h1 className='center'>List Example</h1>
    <Authenticator>
      {({ signOut, user }) => (     <main>
         
        
            <button onClick={signOut}>Sign out : </button>
             <details><summary>
             
             loged in user details  {user?.signInDetails?.loginId}
              
             
            </summary> {JSON.stringify(user)}</details>
         
          <Blurb />
          <hr />
          <List />

        </main>
)}
    </Authenticator></>
  );
};

function Blurb() {

  return (

    <p>
      CRUD for a list of items using aws-amplify DataStore. <br />
      - Create, Read, Update, Delete items <br />
      - Real-time updates <br />
      - Offline support <br />
      - Authentication with AWS Cognito <br />
      - Built with React, TypeScript, Vite, and AWS Amplify <br />
      <br />
      This example uses the Amplify DataStore library to interact with a simple Todo model. <br />
      The DataStore library provides a programming model for leveraging shared and distributed data without needing to write additional code for offline and online scenarios. <br />
      It automatically synchronizes data between your app and the cloud, and between devices. <br />
      <br />
    
     </p>

  )
}




export default App
