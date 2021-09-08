import React from 'react';
import styled from 'styled-components';

const StyledSwitchButton = styled.span`
    --width: ${props => 1.5 * props.values.length}em;
    --padding: calc(0.06 * var(--width));
    --button-size: calc((var(--width) - 2 * var(--padding)) / ${props => props.values.length});
    --height: calc(var(--button-size) + 2 * var(--padding));

    box-sizing: border-box;
    width: var(--width);
    height: var(--height);
    padding: var(--padding);

    display: inline-block;
    position: relative;

    background-color: ${({theme}) => theme.switch.backgroundColor};

    border-radius: var(--height);

    &::after {
        content: "";
        position: absolute;
    
        top: 0;
        left: 0;
    
        width: var(--button-size);
        height: var(--button-size);
    
        background-color: ${({theme}) => theme.switch.buttonColor};
    
        border-radius: var(--height);
        transform: translate(calc(var(--padding) + var(--button-size) * ${props => props.selectedIndex}), var(--padding));
        transition: transform 0.2s;
    }
`;

StyledSwitchButton.defaultProps = {
    theme: {
        button: {
            color: '#36362C',
            backgroundColor: '#E5E4E2',
            shadowColor: '#A79E91',
        },
    },
};


/**
 * Multivalue horizontal switch with circular button.
 * 
 * values is array that switch can take.
 * selectedIndex is index of currently selected valued.
 * onClick is called with index of clicked valued. 
 */
function Switch({values, selectedIndex, onClick, className}) {
    function handleIndexChange(e) {
        const { x, width } = e.nativeEvent.target.getBoundingClientRect();
        const clientX = e.clientX;
        
        const innerX = clientX - x;
        const percentage = innerX / width;
        const option = Math.floor(percentage * values.length);
        onClick(option);
    }

    return (
        <StyledSwitchButton 
            values={values}
            selectedIndex={selectedIndex}
            onClick={handleIndexChange}
            className={className}
        />
    );
}

export default Switch;