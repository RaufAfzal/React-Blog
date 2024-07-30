import React, { useContext, useState } from 'react'
import dateTime from 'date-time'
import api from "./api/posts";
import { useNavigate } from "react-router-dom";
import DataContext from './context/DataContext';


const NewPost = () => {

  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const { posts, setPosts } = useContext(DataContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const lastId = posts.length ? Number(posts[posts.length - 1].id) :0
    const id = (lastId + 1).toString()
    const datetime = (dateTime({ showTimeZone: true }));
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/Posts', newPost)
      setPosts([response.data, ...posts].reverse())
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch (err) {
      console.log(err.message)
    }
  }


  return (
    <main className='NewPost'>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> PostTitle</label>
        <input
          id='postTitle'
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)} />
        <label htmlFor='postBody'> PostBody </label>
        <input
          id='postBody'
          type='text'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'> Submit </button>
      </form>
    </main>
  )
}

export default NewPost
