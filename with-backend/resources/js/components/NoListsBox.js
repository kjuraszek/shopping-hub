import React from 'react';

import { Box } from '@material-ui/core';

function NoListsBox(){
    return(
        <Box
            margin="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
            <p>You have no shopping lists. Click a button below to add one!</p>
        </Box>
    );        
}

export default NoListsBox;
