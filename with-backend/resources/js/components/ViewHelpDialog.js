import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

class ViewHelpDialog extends React.Component{
    constructor(props){
        super(props);
        this.handleDialogClose = this.handleDialogClose.bind(this);
    }
    handleDialogClose(){
      this.props.toggleViewHelpDialog();
    }
    
    render(){
        return(
        <Dialog 
        fullWidth
        open={this.props.viewHelpDialog} 
        onClose={this.handleDialogClose} 
        aria-labelledby="help-dialog-title">
        <DialogTitle id="help-dialog-title">Help</DialogTitle>
        <DialogContent>
            <p>This application helps you to organize your shopping lists. You can add, delete, view and edit contents of each shopping list. </p>
            <p>Add a new list with a <strong>Add New List</strong> button. List name and Priority fields are required. Priority value ranges from 1 (low priority) to 4 (high priority, complete ASAP).</p>
            <p>Each list has four control buttons to: view, edit, mark as completed and delete list. On the top of each list is located a small indicator - its color symbolizes priority of the list. By editing the list you can change its name and priority but also its items.</p>
            <p>You can hide completed lists with <strong>Hide completed lists</strong> switch.</p>
            <p>You can reverse lists order with <strong>Reverse lists order</strong> switch.</p>
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

export default ViewHelpDialog;