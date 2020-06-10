import React, { useReducer } from 'react'

function UserCard({ data }){
    return (
    <div className='user'>
        <h1>{data.name}</h1>
        <h3>{data.email}</h3>
    </div>
    )
    
}

export default UserCard