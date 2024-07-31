import React from 'react'
import { useStoreState } from 'easy-peasy';


const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className='Footer'>
      <p>Post Counts are {postCount}</p>
    </footer>
  )
}

export default Footer
