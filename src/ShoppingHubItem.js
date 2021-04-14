import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, IconButton, Box } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CreateIcon from '@material-ui/icons/Create';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles({
    card: {
        display: "flex",
        flexDirection: "column",
        height:"100%",
        backgroundColor: "#dfe9e6"
    },
    cardContent: {
        display: "flex",
        flex: "1 0 auto",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        '&:hover': {
            backgroundColor: "#eff2f1",
            cursor: "pointer"
        }
    },
    cardActions: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#dfe9e6"
    },
    cardContentcompleted: {
        display: "flex",
        flex: "1 0 auto",
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "column",
        background: "#CFD8DC",
        '&:hover': {
            backgroundColor: "#eff2f1",
            cursor: "pointer"
        }
    },
    cardActionscompleted: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#dfe9e6"
    }
  });

function ShoppingHubItem(props) {
    const classes = useStyles();
        return(
            <Card className={classes.card}>
                <Box
                display="block" 
                align="left"
                color={
                    (props.item.completed ? "text.secondary" : 
                    props.item.priority === 4 ? "secondary.main" : 
                    props.item.priority === 3 ? "warning.main" : 
                    props.item.priority === 2 ? "success.main" : "info.main")
                } >

                    <NewReleasesIcon fontSize="small" />
                </Box>
                <CardContent 
                className={props.item.completed ? classes.cardContentcompleted : classes.cardContent}
                onClick={() => {
                    props.onViewList(props.item)
                }}>
                    
                    <Typography color={props.item.completed ? "textSecondary" : "textPrimary"} variant="h5" component="h2" gutterBottom>
                    {props.item.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                    Items: {props.item.hasOwnProperty("items") ? props.item.items.length : 0}
                    </Typography>
                    <Typography  color="textSecondary" gutterBottom>
                    Priority: {props.item.priority}
                    </Typography>
                    
                    {props.item.completed && <Typography variant="h5" color="textPrimary" gutterBottom>Completed!</Typography>}
                    
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconButton onClick={() => {
                        props.onViewList(props.item)
                    }}>
                        <VisibilityIcon fontSize="small" />
                    </IconButton>     
                    <IconButton onClick={() => {
                        props.onEditList(props.item)
                    }}>
                        <CreateIcon fontSize="small" />
                    </IconButton>     
                    <IconButton 
                    color={props.item.completed ? "inherit" : "default"}
                    onClick={() => {
                        props.onToggleList(props.item)
                    }}>
                        <AssignmentTurnedInIcon fontSize="small" />
                    </IconButton>     
                    <IconButton aria-label="delete" onClick={() => {
                        props.onRemoveList(props.item)
                    }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>     
                </CardActions>
            </Card>
            );
       
}

export default ShoppingHubItem;