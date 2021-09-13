import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { evaluate } from 'mathjs'

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
    const [input, setInput] = useState('');


    const themeNames = Object.keys(themes);
    const nameOfSelectedTheme = theme.name;

    function handleThemeChange(index) {
        const themeName = themeNames[index];
        const newTheme = themes[themeName];
        setTheme(newTheme);
    }

    function handleKeyboardButtonClick(value) {
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(value)) {
            return setInput(input + value);
        }
        if (['+', '-', '*', '/'].includes(value)) {
            return setInput(input + ' ' + value + ' ');
        }

        if (value === 'Del') {
            let newExpression = input.trimEnd();
            newExpression = newExpression.substr(0, (newExpression.length - 1));
            newExpression = newExpression.trimEnd();

            return setInput(newExpression);
        }

        if (value === 'Reset') {
            return setInput('');
        }

        if (value === '=') {
            try {
                setInput(evaluate(input).toString());
            } catch (e) {
                setInput('Syntax Error');
            }
        }
    }

    function handleInputChange(value) {
        setInput(value);
    }


    return (
        <StyledCalculator className={className}>
            <Heading
                selectedIndex={themeNames.indexOf(nameOfSelectedTheme)}
                themeNames={themeNames}
                onThemeChange={handleThemeChange} />
            <Display value={input} onChange={handleInputChange} />
            <Keyboard onButtonClick={handleKeyboardButtonClick} />
        </StyledCalculator>
    );
}

export default Calculator;