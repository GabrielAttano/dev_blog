import { useEffect, useState, useRef } from 'react';

function MainScreen() {
    const [fps, setFps] = useState(60);
    const [count, setCount] = useState(0);

    // useRef is used in values that shouldnt trigger a re-render when updtated
    const requestRef = useRef();
    const previousTimeRef = useRef(Date.now());

    const animate = () => {
        const currentTime = Date.now();

        const deltaTime = currentTime - previousTimeRef.current;
        if (deltaTime > 1000 / fps) {
            setCount(prevCount => (prevCount + 1) % fps);
            previousTimeRef.current = currentTime;
        }

        requestRef.current = requestAnimationFrame(animate);
    }

    // useEffect starts and ends the animationFrame
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); 

    return <div>mainScreen is working! {Math.round(count)}  </div>
}

export default MainScreen