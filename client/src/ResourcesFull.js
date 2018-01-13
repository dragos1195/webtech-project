import React, { Component } from 'react';
import Resource from './Resource.js'
import List from 'material-ui/List/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class ResourcesFull extends Component{
  constructor(props){
    super(props)
    this.state={
      resources:[]
    }
  }
  componentWillMount(){
       fetch('https://studyonline-dragosstrat.c9users.io:8080/resources',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({resources:json}));
  }
  render(){
    let resources = this.state.resources;
    resources = resources.reverse();
    let id;
    if(this.props.match){id = this.props.match.params.idd;}
    if(id){
      resources = resources.filter(function (i,n){
        return i.groupid==id;
    });
    }
    return(
        <MuiThemeProvider>
      <List>
      {resources.map(resource => ( 
            <Resource key={resource.id} resource={resource} userid={this.props.userid} />
        ))}
      </List>
      </MuiThemeProvider>
      );
  }
}
export default ResourcesFull;