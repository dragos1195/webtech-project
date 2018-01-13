
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class Path extends Component {
  constructor(props){
    super(props)
    this.state = {
      path:''
    }
  }
  componentWillMount(){
    if(this.props.match){
      fetch('https://studyonline-dragosstrat.c9users.io:8080/learnpaths/'+this.props.match.params.id,
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({path:json}));
    }
  }
  render() {
    let path = this.props.path;
    
    if(path === undefined){
      path = this.state.path;
     
    }
    let  pathto= '/learningpaths/'+path.id+'/groups';
    return (
      <MuiThemeProvider>
        <Card>
        <CardHeader
          title={path.name}
          subtitle="Details"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton
                href={pathto}
                
                label="Source"
                secondary={true}
               
              />
        </CardActions>
        <CardText expandable={true}>
          {path.details}
        </CardText>
        </Card>
        </MuiThemeProvider>
    )  ;
  }
}

export default Path;