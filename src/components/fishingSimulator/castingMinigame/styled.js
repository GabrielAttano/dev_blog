import styled from "styled-components";

export const castingBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* background-color: white; */
    height: 60px;
    width: 300px;
    position: absolute;
    top: 200px;
    left: 80px;
`;

export const barContainer = styled.div`
    width: 90%;
    height: 60%;
    border-radius: 8px;
    background-color: yellow;
    position: relative;
`;

export const barHighlightedArea = styled.div`
    position: absolute;
    width: ${props => (props.size)}px;
    height: 100%;
    background-color: green;
    left: ${props => props.position - (props.size)/2}px;
    display: ${props => props.position === null ? 'none' : 'block'};
`;

export const canvas = styled.canvas`
    width: 100%;
    height: 40%;
    /* background-color: blue; */
    background: transparent;
`;