import React from 'react'

function ErrorMessage({ message })
{
    return (
        <div>
            <h2>Проблемка</h2>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage