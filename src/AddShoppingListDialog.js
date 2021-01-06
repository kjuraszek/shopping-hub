import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, MenuItem, FormControl, Select, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

class AddShoppingListDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            priority: 1,
            items: [],
            tempItem: ""
        };
        this.initialState = this.state;
        this.newShoppingList = this.newShoppingList.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        
    }
    handleDialogClose(){
      this.setState(this.initialState);
      this.props.toggleAddShoppingListDialog();
    }
    handleInputChange = (event) => {
        const inputName = event.target.name;
        this.setState({
            [inputName]: event.target.value
        });
    };
    handleItemChange = (event,itemChanged) => {
      this.setState((state) => ({
        items: state.items.map((item) => { 
            if(item !== itemChanged ){
                return item;
            } else {
                let newItem = {...item};
                newItem.name = event.target.value;
                return newItem;
            }
        })
    }));
    };
    newShoppingList(){
        if(this.state.name && this.state.priority){
            const list = {
                name: this.state.name,
                priority: this.state.priority,
                items: this.state.items
            }
            this.props.addShoppingList(list);
            this.handleDialogClose();
        }        
    }
    addNewItem(){
      const value = this.state.tempItem;
      if(value.length > 0){
        this.setState( {
          items: this.state.items.concat([{name: value, completed: false}]),
          tempItem: ""
          }
        );
      }   
    }
    deleteItem(itemRemoved){
      this.setState((state) => ({
          items: state.items.filter( item => item !== itemRemoved )
      }))
  }
    render(){
        return(
        <Dialog 
        fullWidth
        open={this.props.addShoppingListDialog} 
        onClose={this.handleDialogClose} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Shopping List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new shopping list fill fields below.
          </DialogContentText>
          <TextField
          required
          id="name"
          name="name"
          label="Shopping List name"
          variant="outlined"
          value={this.state.name}
          onChange={this.handleInputChange}
        />
           <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Priority</InputLabel>
                <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="priority"
                name="priority"
                value={this.state.priority}
                label="Priority"
                onChange={this.handleInputChange}
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
            {this.state.items.map( 
                                (item, index) => <p>
                                  <TextField 
                                  key={index} 
                                  label="Item" 
                                  value={item.name} 
                                  onChange={(event) => {this.handleItemChange(event, item)}}/>
                                  <IconButton>
                                    <DeleteIcon fontSize="small" onClick={() => {this.deleteItem(item)}}/>
                                </IconButton>
                                  </p>)}
            <p>
            <TextField 
            name="tempItem" 
            value={this.state.tempItem} 
            label="Add item" 
            onChange={this.handleInputChange}/>
            <IconButton onClick={this.addNewItem}>
              <AddCircleIcon fontSize="small" />
          </IconButton>
            </p>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.newShoppingList} color="primary">
            Add
          </Button>
          <Button onClick={this.handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        );
    }   
}

export default AddShoppingListDialog;