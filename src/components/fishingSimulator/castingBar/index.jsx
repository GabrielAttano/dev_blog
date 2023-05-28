import { useEffect, useState, useRef } from 'react';
import * as S from './styled';

function CastingBar() {

    const barStart = 20;
    const barEnd = 280; 
    const arrowPointerSize = 40;
    const highlightedAreaSize = 50;
    
    const canvasRef = useRef(null);
    const [highlightedAreaPosition, setHighlightedAreaPosition] = useState(null);
    const arrowPointerPosition = useRef(barStart);
    const arrowPointerSpeed = useRef(3);
    

    const draw = (ctx) => {
        const canvas = canvasRef.current;
        const width = canvas.width; // 300
        const height = canvas.height; // 150
        ctx.clearRect(0, 0, width, height);

        // Draw arrow
        
        ctx.beginPath();
        ctx.moveTo(arrowPointerPosition.current, height);
        ctx.lineTo(arrowPointerPosition.current + (arrowPointerSize/2), 0);
        ctx.lineTo(arrowPointerPosition.current - (arrowPointerSize/2), 0);
        ctx.closePath();
        
        ctx.fillStyle = "green";
        ctx.fill();
        

        // Keeps the arrow inside container
        if (arrowPointerPosition.current + arrowPointerSpeed.current > barEnd) {
            arrowPointerSpeed.current *= -1;
        }
        if (arrowPointerPosition.current + arrowPointerSpeed.current < barStart) {
            arrowPointerSpeed.current *= -1;
        }

        // moves the arrow
        arrowPointerPosition.current += arrowPointerSpeed.current;
    }

    useEffect(() => {
        // Canvas setup
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;

        const render = () => {
            draw(context);
            animationFrameId = window.requestAnimationFrame(render);
        }

        render();

        // Creating random position to be highlighted in the bar
        const min = barStart + (highlightedAreaSize/2);
        const max = barEnd - (highlightedAreaSize/2);
        const randomPosition = Math.random() * (max - min) + min;
        setHighlightedAreaPosition(randomPosition);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [])

    useEffect(() => {

        const handleSpaceKeyDown = () => {
            const highlightedAreaMin = highlightedAreaPosition - (highlightedAreaSize / 2);
            const highlightedAreaMax = highlightedAreaPosition + (highlightedAreaSize / 2);
            if (arrowPointerPosition.current > highlightedAreaMin && arrowPointerPosition.current < highlightedAreaMax) {
                console.log('Success!');
            } else {
                console.log('ok...');
            }
        }
        
        // Space pressed events
        const handleKeyDown = (event) => {
            if(event.code == 'Space') {
                handleSpaceKeyDown();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [highlightedAreaPosition])

    return (
        <S.castingBarContainer>
            <S.canvas ref={canvasRef}></S.canvas>
            <S.barContainer>
                <S.barHighlightedArea position={highlightedAreaPosition} size={highlightedAreaSize}></S.barHighlightedArea>
            </S.barContainer>
        </S.castingBarContainer>
    )
} 

export default CastingBar;
