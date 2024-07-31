import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import About from "./About";
import Missing from "./Missing";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from 'easy-peasy';


function App() {
  const API_URL = "http://localhost:3500/Posts"
  const { data, fetchError, isLoading } = useAxiosFetch(API_URL);

  const setPosts = useStoreActions((actions) => actions.setPosts);

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])

  return (

    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home isLoading={isLoading}
          fetchError={fetchError} />} />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
