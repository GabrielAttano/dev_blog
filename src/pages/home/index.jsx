import MainScreen from '../../components/fishingSimulator/mainScreen';
import * as S from './styled';

function Home () {
    return (
        <S.container>
            <S.heroSectionContainer>
                <MainScreen />
            </S.heroSectionContainer>
        </S.container>
    )
}

export default Home;