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
            linkText:'',
            linkError:'',
            dropValue: null,
            groups:[],
            redirect : false,
            edit:false,
            userid:''
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
    
    onDelete = e => {
       if(this.state.edit)
       {
          fetch('https://studyonline-dragosstrat.c9users.io:8080/resources/' +this.props.match.params.id, {
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
       let link=this.state.linkText;
       if (!/^(f|ht)tps?:\/\//i.test(this.state.linkText)) {
           link = "http://" +this.state.linkText;
         }  
        if(this.state.edit == false){
      fetch('https://studyonline-dragosstrat.c9users.io:8080/resources', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.titleText,
            details: this.state.detailsText,
            path: link,
            userid:this.props.userid,
            groupid:this.state.dropValue,
          })
        })
        }else{
            fetch('https://studyonline-dragosstrat.c9users.io:8080/resources/' +this.props.match.params.id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.titleText,
            details: this.state.detailsText,
            path: link,
            userid:this.state.userid,
            groupid:this.state.dropValue,
          })
        })
        }
     this.setState({redirect:true})
     
    }
    
  };
  
  
    componentWillMount(){
         fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({groups:json}));
    
    if(this.props.match){
        let id = this.props.match.params.id
        let resource;
        this.setState({edit:true})
         fetch('https://studyonline-dragosstrat.c9users.io:8080/resources/'+id,
            {
              method: 'GET',
              credentials: 'include'
            }
            ).then(response => response.json()).then(json => this.setState({titleText:json.name, detailsText:json.details, linkText:json.path, dropValue:json.groupid, userid:json.userid}))
            .catch(err => this.setState({edit:false, redirect:true}));
    }
    }
render(){
    let groups = this.state.groups;
    if(this.props.userid){
        let id=this.props.userid;
        groups = groups.filter(function (i,n){
        return i.userid==id;
        });
    }
     return(
        

          <div>
          <MuiThemeProvider>
           <h2 align='center'>Add a new resource</h2>
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
            {groups.map(group => ( 
             <MenuItem value={parseInt(group.id)} primaryText={group.name} />
           ))}
        </DropDownMenu>
        <br/>
         <RaisedButton label="Add new resource" onClick={e => this.onSubmit(e)} primary />
          {this.state.edit ?<div><br/><RaisedButton label="Delete" onClick={e => this.onDelete(e)} primary /></div>: <p></p> } 
        </form>
    </MuiThemeProvider>
    {this.state.redirect && (
          <Redirect to={'/'}/>
        )}
  </div>
         );
 }
}
export default AddGroup;