import React from 'react'

function Record({ data })
{
    return (
        <div>
            <p>name: {data.name}</p>
            <p>phone: {data.phone}</p>
            <p>Услуга: {data.service}</p>
            <p>День: {data.date}</p>
            <p>Время: {data.time}</p>
            <p>.......................</p>
            <br />
        </div>
    )
}

export default Record