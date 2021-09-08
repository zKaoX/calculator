import React from 'react';
import styled from 'styled-components';
import Switch from './Switch';

const StyledHeading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    color: ${({theme}) => theme.heading.color};
    background-color: ${({theme}) => theme.heading.backgroundColor};

    display: grid;
    grid-template-columns: auto 1fr auto 1em auto;
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "   .      .    .    . options"
                         "app_name  .  theme  . switch";

    .app_name {
        grid-area: app_name;
    }

    .theme {
        grid-area: theme;
    }

    .switch {
        grid-area: switch;
    }

    .options {
        grid-area: options;

        display: flex;
        justify-content: space-around;
    }
`;

StyledHeading.defaultProps = {
    theme: {
        heading: {
            color: '#36362C',
            backgroundColor: '#E5E4E1',
        },
    },
};


/**
 * Heading which showing app name and switch for changing theme.
 * 
 * Instead of theme names their index in given themeNames array is
 * showed
 * 
 * Function onThemeChange is called when switch is clicked.
 * It is called with index of clicked theme name.
 */
function Heading({selectedIndex, themeNames, onThemeChange, className}) {

    return (
        <StyledHeading className={className}>
            <span className="app_name">calc</span>
            <span className='theme'>Theme</span>
            <div className='options'>{themeNames.map((el, i) => <span>{i}</span>)}</div>
            <Switch className='switch' values={themeNames} selectedIndex={selectedIndex} onClick={onThemeChange} />
        </StyledHeading>
    );
}

export default Heading;