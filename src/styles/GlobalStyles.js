import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    html, body, #root {
        height: 100%;
    }

    button {
        cursor: pointer;
        background: none;
        border: none;
        padding: 5px 0px;
    }
`;
