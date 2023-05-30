import { useRef, useState } from 'react';
import * as S from './styled';

import mainScreenStates from './mainScreenStates';
import CastingMinigame from '../castingMinigame';
import HookMinigame from '../hookMinigame';
import hookMinigameStates from '../hookMinigame/hookMinigameStates';

function MainScreen() {
    // game state
    const [gameState, setGameState] = useState(mainScreenStates.Idle);

    // casting minigame 
    const castingMinigameResult = useRef(null);
    const handleCastingMinigameEnd = (state) => {
        castingMinigameResult.current = state;
        setGameState(mainScreenStates.WaitingToHook);
    }

    // hook minigame
    const hookMinigameResult = useRef(null);
    const handleHookMinigameEnd = (state) => {
        if (state === hookMinigameStates.Fail) {
            setGameState(mainScreenStates.Idle);
            return;
        }
        if (state === hookMinigameStates.Success) {
            hookMinigameResult.current = state;
            setGameState(mainScreenStates.Fishing);
        }
    }

    const showInfo = () => {
        return (
            <>
                <S.containerSmall></S.containerSmall>
                <S.containerSmall>
                    <div>state: {gameState}</div>
                    {castingMinigameResult.current !== null ? (
                        <div>casting minigame result: {castingMinigameResult.current}</div>
                    ): false}   
                </S.containerSmall>
            </>
        )
    };

    const startFishingButton = () => {
        return (
            <>
                <S.containerSmall></S.containerSmall>
                <S.containerSmall>
                    <S.button onClick={() => {setGameState(mainScreenStates.Casting)}}>Começar a pescar</S.button>
                </S.containerSmall>
            </>
        )
    }

    return (
        <S.container>
            {gameState === mainScreenStates.Idle ? startFishingButton() : showInfo()}
            {gameState === mainScreenStates.Casting ? <CastingMinigame handleCastingMinigameEnd={handleCastingMinigameEnd}/> : false}
            {gameState === mainScreenStates.WaitingToHook ? <HookMinigame handleHookMinigameEnd={handleHookMinigameEnd}></HookMinigame> : false}
        </S.container>
    )
}

export default MainScreen;
