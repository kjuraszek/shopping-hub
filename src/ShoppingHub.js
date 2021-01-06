import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ShoppingHubItem from './ShoppingHubItem';
import ShoppingHubButton from './ShoppingHubButton';
import AddShoppingListDialog from './AddShoppingListDialog';
import ViewShoppingListDialog from './ViewShoppingListDialog';
import EditShoppingListDialog from './EditShoppingListDialog';
import { Container, Grid } from '@material-ui/core';

// dummy-data
const lists = [
    {name: "Breakfast",
    id: 0,
    items: [{name:"eggs * 6", completed:true},{name:"Bread", completed:false},{name:"Butter", completed:true},{name:"Ham", completed:true}],
    priority: 2,
    completed: false
    },
    {name: "Amazon",
    id: 1,
    items: [{name:"SSD drive", completed:true},{name:"CDs", completed:false}],
    priority: 1,
    completed: false
    },
    {name: "Drugstore",
    id: 2,
    items: [{name:"vitamins: A D E K", completed:true},{name:"Headache pills", completed:true},{name:"Bandage", completed:true}],
    priority: 4,
    completed: true
    },
    {name: "Vegetables",
    id: 3,
    items: [{name:"Peppers * 2", completed:true},{name:"Onions * 3", completed:false},{name:"Cucumber", completed:true}],
    priority: 3,
    completed: false
    }
];

class ShoppingHub extends React.Component{
    constructor(){
        super();
        this.state = {
            lists: lists,
            addShoppingListDialog: false,
            viewShoppingListDialog: false,
            editShoppingListDialog: false,
            selectedList: false
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
    }
    addShoppingList(listAdded){
        let lists = this.state.lists;
        listAdded.id = lists.length > 0 ? lists[lists.length - 1].id + 1 : 0;
        this.setState(state => ({
            lists: state.lists.concat([listAdded])
        }))       
    }
    editShoppingList(listEdited){
        this.setState({
            selectedList: {...listEdited}
        });
        this.toggleEditShoppingListDialog();
    }
    saveShoppingList(listSaved){
        this.setState((state) => ({
            lists: state.lists.map((list) => {
                if(list.id !== listSaved.id ){
                    console.log(":(");
                    return list;
                } else {
                    console.log("!!!!");
                    return listSaved;
                }
            })
        }));      
    }
    viewShoppingList(listViewed){
        this.setState({
            selectedList: {...listViewed}
        });
        this.toggleViewShoppingListDialog();
    }
    deleteShoppingList(listDeleted){
        this.setState((state) => ({
            lists: state.lists.filter(list => list.id !== listDeleted.id )
        }))
    }
    toggleShoppingList(listToggled){
        this.setState((state) => ({
            lists: state.lists.map((list) => { 
                if(list.id !== listToggled.id ){
                    return list;
                } else {
                    let newList = {...list};
                    newList.completed = !list.completed;
                    newList.items = newList.items.map((item) => {
                        item.completed = newList.completed;
                        return item;
                    });
                    return newList;
                }
            })
        }));
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
    render(){
        return(
            <React.Fragment>
            <Header onButtonClick={this.toggleAddShoppingListDialog}/>
            <main>
                <Container>
                <Grid container>
                    <Grid item xs={12} sm={8} lg={9}>
                        <Container>
                        <h1>ShoppingHub</h1>
                        {this.state.lists.length === 0 && <p>You have no shopping lists. Click a button below to add one!</p> }
                        <Grid container spacing={3}  alignItems="stretch" >
                            {this.state.lists.map( 
                                (item, index) => <Grid item xs={12} lg={4} key={index}>
                                    <ShoppingHubItem item={item} 
                                    onEditList={this.editShoppingList} 
                                    onToggleList={this.toggleShoppingList} 
                                    onViewList={this.viewShoppingList} 
                                    onRemoveList={this.deleteShoppingList} />
                                </Grid>)}

                                <Grid item xs={12} lg={4} m={2} key={lists.length}>
                                <ShoppingHubButton  m={2}
                                onButtonClick={this.toggleAddShoppingListDialog} />
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
                        
                    </Container>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                    <Sidebar />
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