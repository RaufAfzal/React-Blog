import { useState, useEffect, createContext } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const API_URL = "http://localhost:3500/Posts"
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const { data, fetchError, isLoading } = useAxiosFetch(API_URL);

    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) => ((post.body).toLowerCase()
            .includes(search.toLowerCase())) || ((post.title).toLowerCase()
                .includes(search.toLowerCase())));
        setSearchResults(filteredResults)
    }, [posts, search])


    return (
        <DataContext.Provider value={{
            posts, setPosts, search, setSearch, searchResults,
            fetchError, isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;     