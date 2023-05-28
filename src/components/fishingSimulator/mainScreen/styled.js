import styled from "styled-components";
import fishingPlaceholder from '../../../assets/fishingBackgroundPlaceholder.png'

export const container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(${fishingPlaceholder});
    background-size: cover;
`;