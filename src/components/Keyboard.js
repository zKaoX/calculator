import React from 'react';
import Button from './Button';
import styled from 'styled-components';

const StyledKeyboard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(5, auto);
    grid-gap: 0.43em;
    
    border-radius: 0.625em;
    border: 0.85em solid ${({theme}) => theme.keyboard.backgroundColor};
    background-color: ${({theme}) => theme.keyboard.backgroundColor};

    & .twoColumns {
        grid-column: span 2;
    }
`;

StyledKeyboard.defaultProps = {
    theme: {
        keyboard: {
            backgroundColor: '#D2CDCD',
        },
    },
};

/**
 * Keyboard for calculator.
 * 
 * Function onChange is called when button is clicked.
 * Its input is value of button.
 */
function Keyboard({ onButtonClick, className }) {
    function handleKeyboardClick(value) {
        onButtonClick(value)
    }

    return (
        <StyledKeyboard className={className}>
            <Button onClick={handleKeyboardClick} value={7} />
            <Button onClick={handleKeyboardClick} value={8} />
            <Button onClick={handleKeyboardClick} value={9} />
            <Button onClick={handleKeyboardClick} value={'Del'} />
            <Button onClick={handleKeyboardClick} value={4} />
            <Button onClick={handleKeyboardClick} value={5} />
            <Button onClick={handleKeyboardClick} value={6} />
            <Button onClick={handleKeyboardClick} value={'+'} />
            <Button onClick={handleKeyboardClick} value={1} />
            <Button onClick={handleKeyboardClick} value={2} />
            <Button onClick={handleKeyboardClick} value={3} />
            <Button onClick={handleKeyboardClick} value={'-'} />
            <Button onClick={handleKeyboardClick} value={'.'} />
            <Button onClick={handleKeyboardClick} value={'0'} />
            <Button onClick={handleKeyboardClick} value={'/'} />
            <Button onClick={handleKeyboardClick} value={'*'} />
            <Button onClick={handleKeyboardClick} value={'Reset'} className='twoColumns' />
            <Button onClick={handleKeyboardClick} value={'='} className='twoColumns' />
        </StyledKeyboard>
    );
}

export default Keyboard;