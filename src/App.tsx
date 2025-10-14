
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import List from './List';


export function App() {

  return (
    <>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1 className='center'>{user?.signInDetails?.loginId} Lists</h1>
            <button onClick={signOut}>Sign out</button>
            <List />
          </main>
        )}
      </Authenticator></>
  );
};





export default App
