import React from 'react';
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClick(event){
        this.setState({
            anchorEl: event.currentTarget
        });
    }
    
    handleClose(){
        this.setState({
            anchorEl: false
        });
    }
    render(){
        return(<AppBar position="static">
                <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem 
                    onClick={() => {
                        this.handleClose();
                        this.props.onButtonClick()}}>
                            Add New List
                    </MenuItem>
                    <MenuItem 
                    onClick={() => {
                        this.handleClose();
                        }}>
                            Help
                    </MenuItem>
                </Menu>
                <Typography variant="h6" >
                    ShoppingHub
                </Typography>
                </Toolbar>
            </AppBar>
        );
    }    
}

export default Header;