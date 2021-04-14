import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ShoppingHubItem from './ShoppingHubItem';
import ShoppingHubButton from './ShoppingHubButton';
import ShoppingHubControls from './ShoppingHubControls';
import AddShoppingListDialog from './AddShoppingListDialog';
import ViewShoppingListDialog from './ViewShoppingListDialog';
import EditShoppingListDialog from './EditShoppingListDialog';
import ViewHelpDialog from './ViewHelpDialog';
import { Container, Box, Grid, CircularProgress } from '@material-ui/core';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import axios from 'axios';

class ShoppingHub extends React.Component{
    constructor(){
        super();
        this.state = {
            lists: [],
            addShoppingListDialog: false,
            viewShoppingListDialog: false,
            editShoppingListDialog: false,
            viewHelpDialog: false,
            selectedList: false,
            hideCompletedLists: false,
            sortBy: "id",
            reverseSorting: false,
            loading_data: true,
            errors: false
        }

        this.addShoppingList = this.addShoppingList.bind(this);
        this.deleteShoppingList = this.deleteShoppingList.bind(this);
        this.toggleShoppingList = this.toggleShoppingList.bind(this);
        this.editShoppingList = this.editShoppingList.bind(this);
        this.viewShoppingList = this.viewShoppingList.bind(this);
        this.saveShoppingList = this.saveShoppingList.bind(this);
        this.toggleAddShoppingListDialog = this.toggleAddShoppingListDialog.bind(this);
        this.toggleViewShoppingListDialog = this.toggleViewShoppingListDialog.bind(this);
        this.toggleEditShoppingListDialog = this.toggleEditShoppingListDialog.bind(this);
        this.toggleViewHelpDialog = this.toggleViewHelpDialog.bind(this);
        this.toggleCompletedLists = this.toggleCompletedLists.bind(this);
        this.toggleSorting = this.toggleSorting.bind(this);
        this.toggleReversedSorting = this.toggleReversedSorting.bind(this);     
    }

    componentDidMount () {
        axios.get('/api/shopping_lists')
        .then(response => {
            let lists = response.data;
            axios.get('/api/shopping_items')
            .then(response => {
                let items = response.data;
                lists.forEach((shopping_list, index)=>{
                    shopping_list.completed = shopping_list.completed === 0 ?  false : true;
                    shopping_list.items = items
                    .filter( (shopping_item) => shopping_item.shopping_list_id === shopping_list.id )
                    .map( (shopping_item) => {
                        shopping_item.completed = shopping_item.completed === 0 ?  false : true;
                        return shopping_item;
                    });
                });
                this.setState({
                    lists: lists,
                    loading_data: false
                });
            })
            
        })
        .catch(error => {
            console.log(error);
            this.setState({
              errors: true,
              loading_data: false
            })
        });
    }

    addShoppingList(listAdded){
        this.setState({
            loading_data: true
        });
        listAdded.completed = false;
        axios.post('/api/shopping_lists', listAdded).then(response => {
            listAdded.id = response.data.id;
            axios.post(`/api/shopping_items/save`, listAdded).then(response => {
                this.setState(state => ({
                    lists: state.lists.concat([listAdded]),
                    loading_data: false
                }));
            });        
        })
        .catch(error => {
            console.log(error); 
        });        
    }
    editShoppingList(listEdited){
        this.setState({
            selectedList: {...listEdited}
        });
        this.toggleEditShoppingListDialog();
    }
    saveShoppingList(listSaved){
        // automatically complete list if all items are completed
        if( listSaved.items.length > 0 && listSaved.items.filter( (item) => !item.completed).length === 0){
            listSaved.completed = true;
        } else {
            listSaved.completed = false;
        }
        this.setState({
            loading_data: true
        });
        axios.post(`/api/shopping_lists/save`, listSaved).then(response => {
            axios.post(`/api/shopping_items/save`, listSaved).then(response => {
                this.setState((state) => ({
                    lists: state.lists.map((list) => {
                        if(list.id !== listSaved.id ){
                            return list;
                        } else {
                            return listSaved;
                        }
                    }),
                    loading_data: false
                }));
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    viewShoppingList(listViewed){
        this.setState({
            selectedList: {...listViewed}
        });
        this.toggleViewShoppingListDialog();
    }
    deleteShoppingList(listDeleted){
        this.setState({
            loading_data: true
        });
        axios.post(`/api/shopping_lists/${listDeleted.id}/delete`).then(response => {
            axios.post(`/api/shopping_items/${listDeleted.id}/delete`).then(response => {
                this.setState((state) => ({
                    lists: state.lists.filter(list => list.id !== listDeleted.id ),
                    loading_data: false
                }))
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    toggleShoppingList(listToggled){
        this.setState({
            loading_data: true
        });
        let newList = {...listToggled};
        newList.completed = !listToggled.completed;
        newList.items = newList.items.map((item) => {
            item.completed = newList.completed;
            return item;
        });

        axios.post(`/api/shopping_lists/save`, newList).then(response => {
            axios.post(`/api/shopping_items/save`, newList).then(response => {
                this.setState((state) => ({
                    lists: state.lists.map((list) => { 
                        if(list.id !== newList.id ){
                            return list;
                        } else {
                            return newList;
                        }
                    }),
                    loading_data: false
                }));
            });
        })
        .catch(error => {
            console.log(error);
        });
 
    }
    toggleAddShoppingListDialog(){
        this.setState((state) => ({
            addShoppingListDialog: !state.addShoppingListDialog
        }));
    }
    toggleViewShoppingListDialog(){
        this.setState((state) => ({
            viewShoppingListDialog: !state.viewShoppingListDialog
        }));
    }
    toggleEditShoppingListDialog(){
        this.setState((state) => ({
            editShoppingListDialog: !state.editShoppingListDialog
        }));
    }
    toggleViewHelpDialog(){
        this.setState((state) => ({
            viewHelpDialog: !state.viewHelpDialog
        }));
    }
    toggleCompletedLists(){
        this.setState((state) => ({
            hideCompletedLists: !state.hideCompletedLists
        }));
    }
    toggleSorting(event){
        this.setState((state) => ({
            sortBy: event.target.value
        }));
    }
    toggleReversedSorting(){
        this.setState((state) => ({
            reverseSorting: !state.reverseSorting
        }));
    }
    render(){
        return(
            <React.Fragment>
            <Header 
            addNewList={this.toggleAddShoppingListDialog}
            viewHelp={this.toggleViewHelpDialog}/>
            <main>
                <Container>
                <Grid container>
                    <Grid item xs={12} sm={8} lg={9}>
                        <Container>
                        <h1>ShoppingHub</h1>

                        {!this.state.loading_data && 
                        !this.state.errors && 
                        <ShoppingHubControls 
                        toggleCompletedLists={this.toggleCompletedLists}
                        toggleSorting={this.toggleSorting}
                        toggleReversedSorting={this.toggleReversedSorting}
                        reverseSorting={this.state.reverseSorting}
                        hideCompletedLists={this.state.hideCompletedLists}
                        sortBy={this.state.sortBy}/>}

                        {!this.state.loading_data  &&
                        this.state.errors &&  
                        <Box
                            margin="15px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <HighlightOffSharpIcon fontSize="large" color="error"/>
                            <p>ShoppingHub was unable do connect to the database</p>
                        </Box>}

                        {this.state.loading_data  &&
                        !this.state.errors &&  
                        <Box
                            margin="15px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <CircularProgress />
                            <p>Loading Your Shopping Lists...</p>
                        </Box>}

                        {!this.state.loading_data && 
                        !this.state.errors && 
                        this.state.lists.length === 0 && 
                        <Box
                            margin="15px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <p>You have no shopping lists. Click a button below to add one!</p>
                        </Box> }

                        <Grid container spacing={3}  alignItems="stretch" >
                            {!this.state.loading_data && 
                            !this.state.errors && 
                            this.state.lists.filter(
                                // hide completed lists if set
                                (item => !this.state.hideCompletedLists || !item.completed)).sort(
                                    // sort lists by sortBy
                                    (a,b) => {
                                        if(this.state.sortBy === "priority"){
                                            // sort by priority from highest
                                            return (this.state.reverseSorting ? a.priority - b.priority : b.priority - a.priority);
                                        } else if(this.state.sortBy === "completion"){
                                            // sort by completion from false
                                            return ( this.state.reverseSorting ? 
                                                (a.completed === b.completed ? 0 : a.completed? -1 : 1) :
                                                (a.completed === b.completed ? 0 : a.completed? 1 : -1)
                                                ); 
                                        } else if(this.state.sortBy === "items"){
                                            // sort by items length from highest
                                            return (this.state.reverseSorting ? a.items.length - b.items.length : b.items.length - a.items.length);
                                        } else if(this.state.sortBy === "name"){
                                            // sort by items name alphabetically
                                            return (this.state.reverseSorting ? b.name > a.name : a.name >= b.name);
                                        } else {
                                            // sort by id by default
                                            return (this.state.reverseSorting ? b.id - a.id : a.id - b.id);
                                        }
                                    }
                                ).map(
                                    // finally map item data 
                                    (item, index) => <Grid item xs={12} lg={4} key={index}>
                                        <ShoppingHubItem item={item} 
                                        onEditList={this.editShoppingList} 
                                        onToggleList={this.toggleShoppingList} 
                                        onViewList={this.viewShoppingList} 
                                        onRemoveList={this.deleteShoppingList} />
                                </Grid>)}

                                <Grid item xs={12} lg={4} m={2} key={this.state.lists.length}>
                                {!this.state.loading_data &&
                                !this.state.errors && 
                                <ShoppingHubButton  
                                    m={2}
                                    onButtonClick={this.toggleAddShoppingListDialog} />}
                                </Grid>
                        </Grid>
                        <AddShoppingListDialog 
                        addShoppingListDialog={this.state.addShoppingListDialog} 
                        toggleAddShoppingListDialog={this.toggleAddShoppingListDialog} 
                        addShoppingList={this.addShoppingList}/>
                        <ViewShoppingListDialog 
                        viewShoppingListDialog={this.state.viewShoppingListDialog} 
                        toggleViewShoppingListDialog={this.toggleViewShoppingListDialog} 
                        selectedList={this.state.selectedList ? this.state.selectedList : {name:"",items:[],completed:false,priority:1}}/>
                        <EditShoppingListDialog 
                        editShoppingListDialog={this.state.editShoppingListDialog} 
                        toggleEditShoppingListDialog={this.toggleEditShoppingListDialog}
                        saveShoppingList={this.saveShoppingList} 
                        selectedList={this.state.selectedList ? this.state.selectedList : {name:"",items:[],completed:false,priority:1}}/>
                        <ViewHelpDialog 
                        viewHelpDialog={this.state.viewHelpDialog} 
                        toggleViewHelpDialog={this.toggleViewHelpDialog} />
                    </Container>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                    <Sidebar
                    numberOfLists={this.state.lists.length}
                    numberOfCompletedLists={this.state.lists.filter( (list) => list.completed ).length}
                    numberOfItems={this.state.lists.reduce( (previousValue, currentList) => 
                        previousValue + (currentList.hasOwnProperty("items") ? currentList.items.length : 0), 0
                    )} 
                    longestList= {this.state.lists.sort(
                        (a,b) => (b.hasOwnProperty("items") && a.hasOwnProperty("items") ? 
                        b.items.length - a.items.length :
                        b.id - a.id)
                    )[0]}/>
                    </Grid>
                </Grid>
                </Container>
            </main>
            <Footer />
      </React.Fragment>
        );
    }    
}

export default ShoppingHub;