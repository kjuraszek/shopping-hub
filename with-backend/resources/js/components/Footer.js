import React from 'react';
import { Container, Divider, Typography, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        display: "flex",
        flex: "1 0 auto",
        alignItems: "flex-end",
        justifyContent: "end",
        marginTop: "30px", 
        marginBottom: "30px" 
    },
    
  });
function Footer(){
    const classes = useStyles();
    return(
        <footer className={classes.footer}>
            <Container>
            <Divider />
            <h2>Source code</h2>
            <Typography color="primary" gutterBottom>
            <Link 
            href="https://github.com/kjuraszek/shopping-hub"
            rel="noopener" 
            target="_blank">
                <GitHubIcon fontSize="small" /> View project source
            </Link>
            </Typography>
            </Container>
        </footer>
    );        
}

export default Footer;