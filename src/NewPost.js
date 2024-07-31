import React from 'react'
import dateTime from 'date-time'
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';


const NewPost = () => {

  const postTitle = useStoreState((state) => state.postTitle);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const postBody = useStoreState((state) => state.postBody);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const posts = useStoreState((state) => state.posts);
  const savePost = useStoreActions((actions) => actions.savePost);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const lastId = posts.length ? Number(posts[posts.length - 1].id) :0
    const id = (lastId + 1).toString()
    const datetime = (dateTime({ showTimeZone: true }));
    const newPost = { id, title: postTitle, datetime, body: postBody }
    savePost(newPost)
    navigate('/')
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
        <button type='button'> Submit </button>
      </form>
    </main>
  )
}

export default NewPost
