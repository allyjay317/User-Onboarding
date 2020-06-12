import React, { useState } from 'react';
import './App.css';
import Form from './Components/Form'
import UserList from './Components/UserList'

function App() {
  const [users, setUsers] = useState([])

  function addUser(user){
    let exists = users.filter(old =>
      old.email === user.email
    ).length > 0;
    if(exists){
      return "This email already has an existing request"
    }
    setUsers([...users, {...user, id: Date.now()}]);
    return "Request Submitted"
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
