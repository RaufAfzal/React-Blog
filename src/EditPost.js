import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import dateTime from 'date-time';
import api from "./api/posts";
import DataContext from './context/DataContext';


const EditPost = () => {
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const { posts, setPosts } = useContext(DataContext)
    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }

    }, [post, setEditBody, setEditTitle])


    const handleEdit = async (id) => {
        const datetime = (dateTime({ showTimeZone: true }));
        const updatedPost = { id, title: editTitle, datetime, body: editBody }
        try {
            const response = await api.put(`/Posts/${id}`, updatedPost)
            setPosts(posts.map((post) => post.id === id ? { ...response.data } : post))
            setEditTitle('')
            setEditBody('')
            navigate('/')
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <main className='NewPost'>
            <>
                <form className='newPostForm' onSubmit={(e) => (e.preventDefault())}>
                    <label htmlFor="postTitle"> PostTitle</label>
                    <input
                        id='postTitle'
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)} />
                    <label htmlFor='postBody'> PostBody </label>
                    <input
                        id='postBody'
                        type='text'
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type='submit' onClick={() => handleEdit(post.id)}> Submit </button>
                </form>
            </>
        </main>
    )
}


export default EditPost
