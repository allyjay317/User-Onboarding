import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form'
import UserList from './Components/UserList'

function App() {
  const [users, setUsers] = useState([])

  function addUser(user){
    setUsers([...users, {...user, id: Date.now()}]);
  }

  return (
    <div className="App">
      <h1>Welcome to the Demolition Experts!</h1>
      <Form add={addUser}/>
      <UserList users={users}/>
    </div>
  );
}

export default App;
