import { useEffect, useState } from 'react';
import * as S from './styled';

import states from '../states';
import CastingBar from '../castingBar';

function MainScreen() {
    const [gameState, setGameState] = useState(states.Idle);
    
    useEffect(() => {
        // Temporary way to test different states
        if (gameState === states.Idle) {
            setGameState(states.Casting);
        }
    }, []);

    return (
        <S.container>
            {gameState === states.Casting ? <CastingBar/> : false}
        </S.container>
    )
}

export default MainScreen;
