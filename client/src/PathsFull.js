import React, { Component } from 'react';
import Path from './Path.js'
import List from 'material-ui/List/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class PathsFull extends Component{
  constructor(props){
    super(props)
    this.state={
      paths:[]
    }
  }
  componentWillMount(){
       fetch('https://studyonline-dragosstrat.c9users.io:8080/learnpaths',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({paths:json}));
  }
  render(){
    let paths = this.state.paths;
    return(
        <MuiThemeProvider>
      <List>
      {paths.map(path => ( 
            <Path key={path.id} path={path} />
        ))}
      </List>
      </MuiThemeProvider>
      );
  }
}
export default PathsFull;