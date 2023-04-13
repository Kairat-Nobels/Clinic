import React from 'react'
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage'

function HomePage()
{
  return (
    <div>
      <h1>Home Page</h1>
      <SuccessMessage message={'хеллоу'} />
    </div>
  )
}

export default HomePage