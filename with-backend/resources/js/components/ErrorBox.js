import React from 'react';

import { Box }  from '@material-ui/core';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';

function ErrorBox(){
    return(
        <Box
            margin="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
            <HighlightOffSharpIcon fontSize="large" color="error"/>
            <p>ShoppingHub was unable do connect to the database</p>
        </Box>
    );        
}

export default ErrorBox;
