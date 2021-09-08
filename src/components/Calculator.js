import React, { useState, useContext } from 'react';
import styled from 'styled-components';
// import { evaluate } from 'mathjs'

import { evaluate } from '../math/math';

import { ContextTheme } from '../themes/Theme';
import themes from '../themes/themes';

import Heading from './Heading';
import Display from './Display';
import Keyboard from './Keyboard';

const StyledCalculator = styled.div`
    background-color: ${({theme}) => theme.calculator.backgroundColor};

    & > :nth-child(n + 2) {
        margin-top: 2rem;
    }
`;

StyledCalculator.defaultProps = {
    theme: {
        calculator: {
            backgroundColor: '#E5E4E1', 
        },
    },
};

/**
 * Calculator for evaluating simple mathematical expressions. 
 */
function Calculator({ className }) {
    const {setTheme, theme} = useContext(ContextTheme);
    const [stringExpression, setStringExpression] = useState('');


    const themeNames = Object.keys(themes);
    const nameOfSelectedTheme = theme.name;

    function handleThemeChange(index) {
        const themeName = themeNames[index];
        const newTheme = themes[themeName];
        setTheme(newTheme);
    }

    function handleKeyboardButtonClick(value) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(value)) {
            return setStringExpression(stringExpression + value);
        }
        if (['+', '-', '*', '/'].includes(value)) {
            return setStringExpression(stringExpression + ' ' + value + ' ');
        }

        if (value === 'Del') {
            let newExpression = stringExpression.trimEnd();
            newExpression = newExpression.substr(0, (newExpression.length - 1));
            newExpression = newExpression.trimEnd();

            return setStringExpression(newExpression);
        }

        if (value === 'Reset') {
            return setStringExpression('');
        }

        if (value === '=') {
            try {
                setStringExpression(evaluate(stringExpression).toString());
            } catch (e) {
                setStringExpression('Syntax Error');
            }
        }
    }

    function handleDisplayInputChange(value) {
        setStringExpression(value);
    }
        

    return (
        <StyledCalculator className={className}>
            <Heading 
                selectedIndex={themeNames.indexOf(nameOfSelectedTheme)}
                themeNames={themeNames} 
                onThemeChange={handleThemeChange}/>
            <Display value={stringExpression} onChange={handleDisplayInputChange}/>
            <Keyboard onButtonClick={handleKeyboardButtonClick} />
        </StyledCalculator>
    );
}

export default Calculator;