import { useRef, useState } from 'react';
import * as S from './styled';

import mainScreenStates from './mainScreenStates';
import CastingMinigame from '../castingMinigame';
import HookMinigame from '../hookMinigame';

function MainScreen() {
    // game state
    const [gameState, setGameState] = useState(mainScreenStates.Idle);

    // casting minigame 
    const castingMinigameResult = useRef(null);
    const handleCastingMinigameEnd = (state) => {
        castingMinigameResult.current = state;
        setGameState(mainScreenStates.WaitingToHook);
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
            {gameState === mainScreenStates.WaitingToHook ? <HookMinigame></HookMinigame> : false}
        </S.container>
    )
}

export default MainScreen;
