import React from 'react'
import { Link } from 'react-router-dom'


const Missing = () => {
  return (
    <main className='Missing'>
      <p>OPPS you have come to wrong site</p>
      <Link to="/">
        <h2>Please visit this link to come to home page</h2>
      </Link>
    </main>
  )
}

export default Missing
