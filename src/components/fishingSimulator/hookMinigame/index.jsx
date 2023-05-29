import { useState, useEffect, useRef } from 'react';
import { FaExclamation } from "react-icons/fa";

import * as S from './styled';
import hookMinigameStates from './hookMinigameStates';

function HookMinigame() {

    // waiting to hook configs
    // time => seconds
    const minTimeToHook = 3;
    const maxTimeToHook = 7;
    const maxTimeToInput = 3;

    const [hookMinigameState, setHookMinigameState] = useState(hookMinigameStates.Waiting);

    const keyPressed = useRef(false);
    const startTime = useRef(null);
    const timeToHook = useRef(null);

    useEffect(() => {

        // Input pressed events
        const handleKeyDown = (event) => {
            if(event.code === 'Space') {
                keyPressed.current = true;
            }
        }

        const handleKeyUp = (event) => {
            if(event.code === 'Space') {
                keyPressed.current = false;
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    useEffect(() => {
        let animationId;
        startTime.current = Date.now();

        const handleTryingToHook = () => {
            const currentTime = Date.now();
            
            // if no input is registered in maxTimeToInput seconds, set state to no action
            if (currentTime > startTime.current + (maxTimeToInput * 1000)) {
                setHookMinigameState(hookMinigameStates.NoAction);
                return;
            }

            // if key pressed in maxTimeToInput seconds, set state to success
            if (keyPressed.current === true) {
                setHookMinigameState(hookMinigameStates.Success);
                return;
            }

            animationId = window.requestAnimationFrame(handleTryingToHook);
            
        }

        const handleWaiting = () => {
            const currentTime = Date.now();

            // if key pressed while waiting, set state to fail
            if (keyPressed.current) {
                setHookMinigameState(hookMinigameStates.Fail);
                return;
            }

            // after timeToHook seconds, set state to trying to hook
            if (currentTime > startTime.current + (timeToHook.current * 1000)) {
                setHookMinigameState(hookMinigameStates.TryingToHook);
                return;
            }
            
            animationId = window.requestAnimationFrame(handleWaiting);
        }

        
        // handle current state
        if (hookMinigameState === hookMinigameStates.Waiting) {
            const randomTime = Math.random() * (maxTimeToHook - minTimeToHook) + minTimeToHook;
            timeToHook.current = randomTime;
            handleWaiting();
        }

        if (hookMinigameState === hookMinigameStates.TryingToHook) {
            handleTryingToHook();
        }

        if (hookMinigameState === hookMinigameStates.Success) {
            console.log("Success!");
        }
        
        if (hookMinigameState === hookMinigameStates.NoAction) {
            console.log('Failed to press input in time');
        }

        if (hookMinigameState === hookMinigameStates.Fail) {
            console.log('Input pressed at the wrong time!');
        }

        return () => {
            window.cancelAnimationFrame(animationId);
        }

    }, [hookMinigameState])
    return (
        <S.waitingToHookContainer>
            {hookMinigameState === hookMinigameStates.Waiting ? <div>Esperando peixe fisgar...</div> : false}
            {hookMinigameState === hookMinigameStates.TryingToHook ? <div><FaExclamation size={48} color={'red'}/></div> : false}
            {hookMinigameState === hookMinigameStates.Success ? <div>Conseguiu fisgar o peixe!</div> : false}
            {hookMinigameState === hookMinigameStates.Fail ? <div>Apertou espaço na hora errada...</div> : false}
            {hookMinigameState === hookMinigameStates.NoAction ? <div>Não apertou espaço a tempo...</div> : false}
        </S.waitingToHookContainer>
    )
}

export default HookMinigame;