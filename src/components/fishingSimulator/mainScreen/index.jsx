import { useEffect, useState } from 'react';
import * as S from './styled';

import mainScreenStates from './mainScreenStates';
import CastingMinigame from '../castingMinigame';

function MainScreen() {
    const [gameState, setGameState] = useState(mainScreenStates.Idle);

    const handleCastingMinigameEnd = (state) => {
        console.log(state);
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
            {gameState === mainScreenStates.Casting ? <CastingMinigame handleCastingMinigameEnd={handleCastingMinigameEnd}/> : false}
        </S.container>
    )
}

export default MainScreen;
