import * as React from 'react';
import MUIButton from '@mui/material/Button';

const Button = ({ color, children }) => {
    return (
        <MUIButton variant="contained" disableElevation color={color} >
            {children}
        </MUIButton>
    );
}
export default Button;