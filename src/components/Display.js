import React from '@testing-library/react';
import style from 'styled-components';

const StyledInput = style.input`
    font-size: 2rem;

    font-family: 'Spartan';
    font-style: normal;
    font-weight: 700;
    line-height: 1.125;
    text-align: right;

    box-sizing: border-box;
    width: 100%;
    display: inline-block; 
    padding: 0.8125em 0.670em;
    border-width: 0;
    border-radius: 0.3125em;

    color: ${({theme}) => theme.display.color};
    background-color: ${({theme}) => theme.display.backgroundColor};

    &:focus, &:active, $:focus-visible {
        outline-width: 0px;
    }
`;

StyledInput.defaultProps = {
    theme: {
        display: {
            color: '#36362C',
            backgroundColor: '#EEEEEE',
        },
    },
};


/**
 * Display showing given value. Function onChange is called when 
 * text is typed in display. It takes typed text as first argument.
 */
function Display({value, onChange, className}) {
    function handleValueChange(e) {
        onChange(e.target.value);
    }

    return (
        <StyledInput
            type="text"
            value={value}
            onChange={handleValueChange}
            className={className}
        />
    );
}

export default Display;