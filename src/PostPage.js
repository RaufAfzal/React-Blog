import { useParams, Link, useNavigate } from "react-router-dom"
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const { id } = useParams();
  const navigate = useNavigate();
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id)

  const handleDelete = (id) => {
    deletePost(id)
    navigate('/')
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/post/edit/${post.id}`}><button className="editPost">Edit Post</button></Link>
            <button onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <p>Post Not found</p>
            <h3>Well its very disappointing to see</h3>
            <Link to="/"> Please Visit our Home page</Link>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
