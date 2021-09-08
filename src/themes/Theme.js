import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import themes from './themes';

const ContextTheme = React.createContext();

/**
 * Provides styled components with theme
 * and exposes context through which you 
 * can get access to current theme and 
 * function for changing theme.
 * 
 * Examples:
 * 1) Give styled component access to prop theme
 *  <Theme>
 *    <StyledButton />
 *  </Theme>
 * 
 * 2) Get current theme and change theme on click.
 *  const { theme, setTheme } = useContext(ContextChangeTheme);
 *  <h1 onClick={() => setTheme(themes.darkTheme)}>change theme</h1> 
 */
function Theme({ children }) {
    const [theme, setTheme] = useState(themes.white);
    
    return (
        <ThemeProvider theme={theme}>
            <ContextTheme.Provider value={{ theme, setTheme }}>
                { children }
            </ContextTheme.Provider>
        </ThemeProvider>
    );
}

export default Theme;
export { ContextTheme }