import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Spartan';
    font-style: normal;
    font-weight: 700;
  }

  body {
    margin: 0;
  }

  :root {
    font-size: calc(0.5em + 1vw);
  }

  @media (min-width: 60em) {
    :root {
      font-size: 1.1em;
    }
  }

  body {
    background-color: ${({theme}) => theme.global.backgroundColor};
  }
`;

GlobalStyle.defaultProps = {
  global: {
    backgroundColor: '#17062A',
  },
}

export default GlobalStyle