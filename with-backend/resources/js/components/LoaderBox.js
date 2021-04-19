import React from 'react';

import {  Box, CircularProgress } from '@material-ui/core';

function LoaderBox(){
    return(
        <Box
            margin="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            >
            <CircularProgress />
            <p>Loading Your Shopping Lists...</p>
        </Box>
    );        
}

export default LoaderBox;
