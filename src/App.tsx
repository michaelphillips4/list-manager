
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import List from './List';


export function App() {

  return (
    <>
      <Authenticator>
        {({ signOut}) => (
          <main>
            <div className='list-row'><h1 className='center list-item-grow'>Lists</h1>
            <button onClick={signOut}>Sign out</button></div>
            <List />
          </main>
        )}
      </Authenticator></>
  );
};





export default App
