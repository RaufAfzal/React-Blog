import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = () => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            const url = 'http://localhost:3500/Posts';
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (error) {
                if (isMounted) {

                    setFetchError(error.message);
                }
            } finally {
                if (isMounted) {
                    setTimeout(() => setIsLoading(false), 2000);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            source.cancel("Request canceled by cleanup");
        };
    }, []);

    return { data, fetchError, isLoading };
};

export default useAxiosFetch;
