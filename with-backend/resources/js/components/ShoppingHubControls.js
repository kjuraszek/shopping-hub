import React from 'react';
import { FormControl, FormControlLabel, InputLabel, Select, MenuItem, Switch, Grid  } from '@material-ui/core';

function ShoppingHubControls(props) {
    return(
        <React.Fragment>
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
            >
            <Grid item xs={12} md={6} >
                <FormControlLabel
                control={
                    <Switch
                    checked={props.hideCompletedLists}
                    onChange={props.toggleCompletedLists}
                    name="HideCompletedLists"
                    color="primary"
                />
                }
                label="Hide completed lists"
                />
                <FormControlLabel
                control={
                    <Switch
                    checked={props.reverseSorting}
                    onChange={props.toggleReversedSorting}
                    name="ReverseSorting"
                    color="primary"
                />
                }
                label="Reverse lists order"
                />
            </Grid>
            <Grid item xs={12} md={6} >
                <FormControl fullWidth>
                    <InputLabel id="shopping-hub-select-label">Sort by</InputLabel>
                    <Select
                    
                    labelId="shopping-hub-select-label"
                    id="shopping-hub-select"
                    value={props.sortBy}
                    onChange={props.toggleSorting}
                    >
                    <MenuItem value="id">Id</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                    <MenuItem value="completion">Completion</MenuItem>
                    <MenuItem value="items">Items quantity</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}

export default ShoppingHubControls;