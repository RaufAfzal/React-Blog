import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState ({
        width: undefined,
        height: undefined
    });


    useEffect(() => {
        const handleSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleSize();

        window.addEventListener('Resize', handleSize);

        return  () => {
            window.removeEventListener('Resize', handleSize)
        }
    },[])

    return {windowSize};  
}

export default useWindowSize
