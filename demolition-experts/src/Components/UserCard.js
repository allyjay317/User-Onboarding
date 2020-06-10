import React, { useReducer } from 'react'

function UserCard({ data }){

    const services = {
        "building": "Demolish Building",
        "mountain": "Demolish Mountain",
        "tunnel": "Carve a Tunnel",
        "hell": "Break through the gates of hell to rescue a loved one from the firey pit"
    }

    return (
    <div className='user'>
        <h1>{data.name}</h1>
        <h3>{data.email}</h3>
        <p>{services[data.service]}</p>
    </div>
    )
    
}

export default UserCard