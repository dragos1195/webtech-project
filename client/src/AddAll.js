import React, { Component } from 'react';
import Resource from './Resource.js'
import List from 'material-ui/List/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';



class AddAll extends Component{
    constructor(props){
        super(props)
        this.state={
            titleText : '',
            titleError:'',
            detailsText:'',
            detailsError:'',
            linkText:'',
            linkError:'',
            dropValue: null,
            groups:[]
        }
    }
   handleChange = (event, index, dropValue) => {this.setState({dropValue});
       
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
        
         if (this.state.linkText.indexOf('.') < 1) {
          isError = true;
          errors.linkError = "Invalid link";
        }
        
        this.setState({
          ...this.state,
          ...errors
        });
        
        return isError;
    };
    
    onSubmit = e => {
    e.preventDefault();

    const err = this.validate();
    
    if (!err) {
        
        
      fetch('https://studyonline-dragosstrat.c9users.io:8080/resources', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.titleText,
            details: this.state.detailsText,
            path:this.state.linkText,
            groupid:this.state.dropValue,
          })
        })
     
    }
    
  };
  
  
    componentWillMount(){
         fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({groups:json}));
    
    
    }
render(){
     return(
        

          <div>
          <MuiThemeProvider>
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
          floatingLabelText="Details"
          value={this.state.detailsText}
          errorText={this.state.detailsError}
          onChange={e=>this.change(e)}
          multiLine={true}
          rows={2}
          floatingLabelFixed
        /><br />
        <TextField
          name="linkText"
         
          floatingLabelText="Link to resource"
          value={this.state.linkText}
          onChange={e => this.change(e)}
          errorText={this.state.linkError}
          floatingLabelFixed
        /><br />
        
        <DropDownMenu
          name="dropValue"
          value={this.state.dropValue}
          onChange={this.handleChange}
          style={{width:300}}
          autoWidth={false}
        >
            {this.state.groups.map(group => ( 
             <MenuItem value={parseInt(group.id)} primaryText={group.name} />
           ))}
        </DropDownMenu>
        <br/>
         <RaisedButton label="Add new resource" onClick={e => this.onSubmit(e)} primary />
        </form>
    </MuiThemeProvider>
  </div>
         );
 }
}
export default AddAll;