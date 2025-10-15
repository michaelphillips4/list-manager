
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import List from './List';


export function App() {

  return (
    <>
      <Authenticator>
        {({ signOut }) => (
          <main>
            <h1 className='center'>Lists</h1>
            <List />

            <footer className='center'>
              <button onClick={signOut}>Sign out</button>
            </footer>

          </main>
        )}
      </Authenticator></>
  );
};





export default App
