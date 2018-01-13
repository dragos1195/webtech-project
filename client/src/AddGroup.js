import React, { Component } from 'react';
import Resource from './Resource.js'
import List from 'material-ui/List/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Redirect } from 'react-router'


class AddGroup extends Component{
    constructor(props){
        super(props)
        this.state={
            titleText : '',
            titleError:'',
            detailsText:'',
            detailsError:'',
            dropValueCat: null,
            dropValueLP:null,
            paths:[],
            categories:[],
            redirect : false,
            edit:false,
            userid:''
        }
    }
   handleChangeCat = (event, index, dropValueCat) => {this.setState({dropValueCat})};
   handleChangeLP = (event, index, dropValueLP) => {this.setState({dropValueLP});    
   }
   change = e => {
       
        this.setState({
          [e.target.name]: e.target.value
        });
         
   };

    validate = () => {
        let isError = false;
        const errors = {
          titleError: "",
          detailsError: "",
          linkError: "",
        };
        
        if (this.state.titleText.length < 2) {
          isError = true;
          errors.titleError = "Title too short";
        }
        
        if (this.state.detailsText.length < 2) {
          isError = true;
          errors.detailsError = "Details too short";
        }

        this.setState({
          ...this.state,
          ...errors
        });
        
        return isError;
    };
    
     onDelete = e => {
       if(this.state.edit)
       {
          fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/' +this.props.match.params.id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          })
             this.setState({redirect:true})
       }
     }
    
    onSubmit = e => {
    e.preventDefault();

    const err = this.validate();
    
    if (!err) {
        
         if(this.state.edit == false){
      fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.titleText,
            details: this.state.detailsText,
            userid: this.props.userid,
            categoryid: this.state.dropValueCat,
            learnpathid:this.state.dropValueLP,
          })
        })
         }else{
            fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/' +this.props.match.params.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.titleText,
            details: this.state.detailsText,
            userid:this.state.userid,
            categoryid: this.state.dropValueCat,
            learnpathid:this.state.dropValueLP,
          })
            })
         }
     this.setState({redirect:true})
    
    }
    
  };
  
  
    componentWillMount(){
         fetch('https://studyonline-dragosstrat.c9users.io:8080/learnpaths/',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({paths:json}));
    
    fetch('https://studyonline-dragosstrat.c9users.io:8080/categories/',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({categories:json}));
    
    if(this.props.match){
        let id = this.props.match.params.id
        let resource;
        this.setState({edit:true})
         fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/'+id,
            {
              method: 'GET',
              credentials: 'include'
            }
            ).then(response => response.json()).then(json => {this.setState({titleText:json.name, detailsText:json.details, dropValueCat:json.categoryid, dropValueLP:json.learnpathid, userid:json.userid})})
            .catch(err => this.setState({edit:false, redirect:true}));
            
        
    }
    }
    
    
    
render(){
  
     return(
        

          <div>
          <MuiThemeProvider>
          <h2 align='center'>Add a new group</h2>
           <form align='center'>
        <TextField 
          name="titleText"
          floatingLabelText="Title"
          value={this.state.titleText}
          onChange={e => this.change(e)}
          errorText={this.state.titleError}
          floatingLabelFixed
        /><br />
      
        <TextField
          name="detailsText"
          hintText="Details"
          value={this.state.detailsText}
          errorText={this.state.detailsError}
          onChange={e=>this.change(e)}
          multiLine={true}
          rows={2}
          floatingLabelFixed
        /><br />
        
        <DropDownMenu
          name="dropValueCat"
          value={this.state.dropValueLP}
          onChange={this.handleChangeLP}
          style={{width:300}}
          autoWidth={false}
        >
            {this.state.paths.map(path => ( 
             <MenuItem value={parseInt(path.id)} primaryText={path.name} />
           ))}
        </DropDownMenu>
        <br/>
        <DropDownMenu
          name="dropValueLP"
          value={this.state.dropValueCat}
          onChange={this.handleChangeCat}
          style={{width:300}}
          autoWidth={false}
        >
            {this.state.categories.map(category => ( 
             <MenuItem value={parseInt(category.id)} primaryText={category.name} />
           ))}
        </DropDownMenu>
        
        
        
        <br/>
         <RaisedButton label="Add new group" onClick={e => this.onSubmit(e)} primary />
         {this.state.edit ?<div><br/><RaisedButton label="Delete" onClick={e => this.onDelete(e)} primary /></div>: <p></p> } 
        </form>
    </MuiThemeProvider>
    {this.state.redirect && (
          <Redirect to={'/groups/me'}/>
        )}
  </div>
         );
 }
}
export default AddGroup;    