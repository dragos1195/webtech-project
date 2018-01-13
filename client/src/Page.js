import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import FlatButton from 'material-ui/FlatButton';


import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Resources from './Resources';
import Router from 'react-router';
import { Link } from 'react-router-dom';

import DropDownMenu from 'material-ui/DropDownMenu';
import { Redirect } from 'react-router'
class Page extends Component{
    constructor(props){
        super(props);
        this.state={
            logged:false, 
            resources: [],
            name: '',
            id : null,
            menuOpened : false,
            dropValue:1,
            redirect:false
        }
    }
    
  
    
    componentDidMount = ()=>{
      
          fetch('https://studyonline-dragosstrat.c9users.io:8080/me',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => {this.setState({id:json.id, name:json.lastname, logged:true}); this.props.onUpdate(json.id)}).catch(err => {console.log(err)});
  }
   
  
  //login
  
  handleLogout = () => {
    fetch('https://studyonline-dragosstrat.c9users.io:8080/logout',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response =>  this.setState({logged:false, redirect:true}));
  }
  
  handleToggle = () =>{
    this.setState({menuOpened: !this.state.menuOpened});
  }
  
  handleLP = () =>{
    window.location = '/resources';
  }
  
  handleTitleClick = () =>{
      
  }
//   linkToAdd = () =>{
//       return <Link to="/add">ADD</Link>;
//   }
  handleChange = (event, index, dropValue) => {this.setState({dropValue})};
  linkToAdd = () =>{
    if(this.props.loggedIn){
      return  ( 
      <div><DropDownMenu  value={this.state.dropValue}  onChange={this.handleChange}>
          <MenuItem value={1} primaryText="ADD" />
          <MenuItem value={2} primaryText="Add Resource" containerElement={<Link to="/add/resource" />} />
          <MenuItem value={3} primaryText="Add Group" containerElement={<Link to="/add/group" />} />
        </DropDownMenu>
        </div>
        );
    }
  }
    render(){
       
        return(
        <div>
            <MuiThemeProvider >
                <AppBar
                  title={this.linkToAdd()}
                  onTitleClick={this.handleTitleClick}
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  onLeftIconButtonClick={this.handleToggle}
                  iconElementRight={this.props.loggedIn ? <span>Welcome, {this.state.name} <a  href="/logout">Logout</a>
                  </span> : <a  href="https://studyonline-dragosstrat.c9users.io:8080/auth/facebook">Login with Facebook</a>}
                />
                <div>
                </div>{this.props.loggedIn ? 
                <Drawer
                  docked={false}
                  open={this.state.menuOpened}
                  onRequestChange={(open) =>this.setState({menuOpened:open})}
                >
                  <MenuItem containerElement={<Link to="/learningpaths" />}>Learning paths</MenuItem>
                  <MenuItem containerElement={<Link to="/resources" />}>Study resources</MenuItem>
                  <MenuItem containerElement={<Link to="/groups/me"  />}>My Groups</MenuItem>
                </Drawer> : ''
                  
                }
                
            </MuiThemeProvider>
        </div>
        );
}
}
export default Page;