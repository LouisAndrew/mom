import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      overflow-x: hidden;
    }

    .top {
      padding-top: 5vh !important;

      @media screen and (max-width: 768px) and (orientation: landscape) {
        padding-top: 20vh !important;
      }

      
    }
`;

export { GlobalStyles };
