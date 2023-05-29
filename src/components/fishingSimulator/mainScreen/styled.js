import styled from "styled-components";
import fishingPlaceholder from '../../../assets/fishingBackgroundPlaceholder.png'

export const container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(${fishingPlaceholder});
    background-size: cover;
`;

export const containerSmall = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
`;