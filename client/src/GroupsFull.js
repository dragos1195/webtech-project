import React, { Component } from 'react';
import Group from './Group.js'
import List from 'material-ui/List/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class GroupsFull extends Component{
  constructor(props){
    super(props)
    this.state={
      groups:[]
    }
  }
  componentWillMount(){
       fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({groups:json}));
  }
  render(){
    let groups = this.state.groups;
    let id;
    if(this.props.match){
      id = this.props.match.params.id;
    
    }
    if(id){
        groups = groups.filter(function (i,n){
        return i.learnpathid==id;
        
    });
    }
    if(this.props.userid){
        let idd=this.props.userid;
        groups = groups.filter(function (i,n){
        return i.userid==idd;
        });
    }
    return(
        <MuiThemeProvider>
      <List>
      {groups.map(group => ( 
            <Group key={group.id} group={group} userid={this.props.userid}/>
        ))}
      </List>
      </MuiThemeProvider>
      );
  }
}
export default GroupsFull;