import React from 'react';
import { Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        display: "flex",
        flex: "1 0 auto",
        alignItems: "flex-end",
        justifyContent: "end",
        flexDirection: "column",
        marginTop: "30px" 
    },
    
  });
function Footer(){
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            <Container>
            <Divider />
            <h2>Footer</h2>
            <p>Footer content</p>
            </Container>
        </footer>
    );        
}

export default Footer;