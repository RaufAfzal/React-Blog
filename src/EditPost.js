import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import dateTime from 'date-time';
import { useStoreState, useStoreActions } from 'easy-peasy';


const EditPost = () => {
    const editTitle = useStoreState((state) => state.editTitle);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const editBody = useStoreState((state) => state.editBody);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const editPost = useStoreActions((actions) => actions.editPost);
    const { id } = useParams();
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id)
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
        editPost(updatedPost)
        navigate('/')
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
                    <button type='button' onClick={() => handleEdit(post.id)}> Submit </button>
                </form>
            </>
        </main>
    )
}


export default EditPost
