import React from 'react'
import UserCard from './UserCard'

function UserList(props){
    return <div>
        {props.users.map(user =>{
            return <UserCard data={user} />
        })}
    </div>
}

export default UserList