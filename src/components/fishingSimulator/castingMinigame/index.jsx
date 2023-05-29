import { useEffect, useState, useRef } from 'react';

import * as S from './styled';

import castingMinigameStates from './castingMinigameStates';

function CastingMinigame({ handleCastingMinigameEnd }) {

    // distance where the barContainer is in the canvas
    const barStart = 20;
    const barEnd = 280; 

    // pointer configs
    const arrowPointerSize = 40;
    const arrowPointerSpeed = useRef(3);
    const arrowPointerPosition = useRef(barStart);
    
    // highlighted area configs
    const highlightedAreaSize = 50;
    const [highlightedAreaPosition, setHighlightedAreaPosition] = useState(null);
    
    // canvas
    const canvasRef = useRef(null);

    const draw = (ctx) => {
        // canvas
        const canvas = canvasRef.current;
        const width = canvas.width; // 300
        const height = canvas.height; // 150
        ctx.clearRect(0, 0, width, height);

        // Draw pointer
        
        ctx.beginPath();
        ctx.moveTo(arrowPointerPosition.current, height);
        ctx.lineTo(arrowPointerPosition.current + (arrowPointerSize/2), 0);
        ctx.lineTo(arrowPointerPosition.current - (arrowPointerSize/2), 0);
        ctx.closePath();
        
        ctx.fillStyle = "green";
        ctx.fill();
        

        // Changes pointer speed so that it stays inside container
        // Positive speed => going forward
        // Negative speed => going backwards
        if (arrowPointerPosition.current + arrowPointerSpeed.current > barEnd) {
            arrowPointerSpeed.current *= -1;
        }
        if (arrowPointerPosition.current + arrowPointerSpeed.current < barStart) {
            arrowPointerSpeed.current *= -1;
        }

        // moves the pointer position
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

        // Creating random position to be highlighted in the barContainer
        // the position value is going to be the middle of the highlighted area (instead of the left)
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

            // Checks if the pointer is inside the highlighted area
            if (arrowPointerPosition.current > highlightedAreaMin && arrowPointerPosition.current < highlightedAreaMax) {
                handleCastingMinigameEnd(castingMinigameStates.Success);
            } else {
                handleCastingMinigameEnd(castingMinigameStates.Ok);
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

export default CastingMinigame;
