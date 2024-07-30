import { useParams, Link, useNavigate } from "react-router-dom"
import api from "./api/posts";
import { useContext } from "react";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const {posts, setPosts} = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const postlist = posts.filter((post) => post.id !== id)
    try {
      await api.delete(`/Posts/${id}`)
      setPosts(postlist)
      navigate('/')
    }
    catch (err) {
      console.log(err.message)
    }

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
