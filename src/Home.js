import React, {useContext} from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {

  const {searchResults, isLoading, fetchError} = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts....</p>} 
      {!isLoading && fetchError && <p className='statusMsg' style={{ color: 'red' }}>{fetchError}</p>}
      {!isLoading && searchResults.length ? (
        <Feed searchResults={searchResults} />
      ) : <p style={{ marginTop: "2rem" }}> No posts to display</p>}
    </main>
  )
}

export default Home
