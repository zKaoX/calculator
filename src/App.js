import styled from 'styled-components'
import Calculator from './components/Calculator';
import Theme from './themes/Theme';
import GlobalStyle from './GlobalStyle';

const StyledApp = styled.div`
  margin: 0 auto;
  height: 100vh;
  width: 90%;
  max-width: 1080px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;


function App() {
  return (
      <Theme>
        <GlobalStyle />
        <StyledApp>
          <Calculator />
        </StyledApp>
      </Theme>
  )
}

export default App;
