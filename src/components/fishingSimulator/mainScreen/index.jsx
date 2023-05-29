import { useEffect, useRef, useState } from 'react';
import * as S from './styled';

import mainScreenStates from './mainScreenStates';
import CastingMinigame from '../castingMinigame';

function MainScreen() {
    const [gameState, setGameState] = useState(mainScreenStates.Idle);

    const castingMinigameResult = useRef(null);

    const handleCastingMinigameEnd = (state) => {
        castingMinigameResult.current = state;
        setGameState(mainScreenStates.WaitingToHook);
    }

    useEffect(() => {
        // Temporary way to test different states
        if (gameState === mainScreenStates.Idle) {
            setGameState(mainScreenStates.Casting);
        }
    }, [gameState]);

    return (
        <S.container>
            <S.containerSmall></S.containerSmall>
            <S.containerSmall>
                <div>state: {gameState}</div>
                {castingMinigameResult.current !== null ? (
                    <div>casting minigame result: {castingMinigameResult.current}</div>
                ): false}   
                
            </S.containerSmall>
            {gameState === mainScreenStates.Casting ? <CastingMinigame handleCastingMinigameEnd={handleCastingMinigameEnd}/> : false}
        </S.container>
    )
}

export default MainScreen;
