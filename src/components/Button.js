import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: 1.75rem;

    font-family: 'Spartan';
    font-style: normal;
    font-weight: 700;
    line-height: 1.11em;

    position: relative;
    top: 0;

    padding: 0.35em;

    border-width: 0;
    border-radius: 0.18em;
  
    color: ${({theme}) => theme.button.color};
    background-color: ${({theme}) => theme.button.backgroundColor};
    
    box-shadow: 0 0.14em ${({theme}) => theme.button.shadowColor};

    transition: top 0.1s;  
    
    /* Pushes button down */
    &:active {
        top: 0.014em;
        box-shadow: 0 0 ${({theme}) => theme.button.shadowColor};
        
        color: ${({theme}) => theme.button.color};
        background-color: ${({theme}) => theme.button.backgroundColor};
   }
`;

StyledButton.defaultProps = {
    theme: {
        button: {
            color: '#36362C',
            backgroundColor: '#E5E4E2',
            shadowColor: '#A79E91',
        }
    }
}


/**
 * Pushable button, showing given value. Function onClick is
 * called when button is clicked. Its get called with given value
 */
function Button({onClick, value, className}) {
    function handleButtonClick(e) {
        onClick(e.target.value);
    }

    return (
        <StyledButton
            onClick={handleButtonClick}
            value={value}
            className={className}
        >
            {value}
        </StyledButton>
    );
}

export default Button;