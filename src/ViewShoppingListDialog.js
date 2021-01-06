import React from 'react';
import { Button, Typography, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

class ViewShoppingListDialog extends React.Component{
    constructor(props){
        super(props);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    handleDialogClose(){
      this.props.toggleViewShoppingListDialog();
    }
    
    render(){
        return(
        <Dialog 
        fullWidth
        open={this.props.viewShoppingListDialog} 
        onClose={this.handleDialogClose} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Your Shopping List</DialogTitle>
        <DialogContent>
          <Typography variant="h5" color="primary">{this.props.selectedList.name}</Typography>
          <Typography variant="h6" color="textSecondary">Priority: {this.props.selectedList.priority}</Typography>
          <Typography variant="h6" color="textSecondary">Items: {this.props.selectedList.items.length}</Typography>
          <br />
          {this.props.selectedList.items.length === 0 && <p>This list is empty.</p> }
            {this.props.selectedList.items.map( 
                                (item, index) => <React.Fragment>
                                  <Typography 
                                  gutterBottom
                                  color={item.completed ? "textSecondary" : "textPrimary"} 
                                  key={index}>
                                    {item.completed ? <strike>{item.name}</strike> : item.name}
                                    </Typography>
                                  <Divider />
                                  </React.Fragment>)}

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        );
    }   
}

export default ViewShoppingListDialog;