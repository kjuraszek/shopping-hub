import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';


const useStyles = makeStyles({
    card: {
        display: "flex",
        flexDirection: "column",
        height:"100%",
        backgroundColor: "#fff",
        '&:hover': {
            backgroundColor: "#dfe9e6",
            cursor: "pointer"
        }
    },
    cardContent: {
        display: "flex",
        flex: "1 0 auto",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingBottom: 0,
    }
  });

function ShoppingHubButton(props) {
    const classes = useStyles();
        return(
            <Card className={classes.card} onClick={props.onButtonClick} gutterBottom>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h2" color="textSecondary" >
                    <AddCircleIcon fontSize="large" />
                    </Typography>

                </CardContent>
                <CardActions></CardActions>
            </Card> 
            );
       
}

export default ShoppingHubButton;