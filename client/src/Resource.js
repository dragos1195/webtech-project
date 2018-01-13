
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookProvider, { Share } from 'react-facebook';

class Resource extends Component {
  constructor(props){
    super(props)
    this.state = {
      resource:''
    }
  }
  componentWillMount(){
    if(this.props.match){
      fetch('https://studyonline-dragosstrat.c9users.io:8080/resources/'+this.props.match.params.id,
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({resource:json}));
    }
  }
  render() {
    let resource = this.props.resource;
    if(resource === undefined){
      resource = this.state.resource;
      
    }
    console.log(this.props.userid);
    let logged=false;
    let pathToEdit = ''
    if(this.props.userid == resource.userid){
      logged=true;
      pathToEdit = '/add/resource/' + resource.id;
    }
    let pathToShare = 'https://studyonline-dragosstrat.c9users.io:8081/resources/'+resource.id
    console.log(this.props.idd);
    return (
      <MuiThemeProvider>
        <Card>
        <CardHeader
          title={resource.name}
          subtitle="Details"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <RaisedButton
                href={resource.path}
                target="_blank"
                label="Source"
                primary={true}
               
              />
        
        {logged ? 
          <RaisedButton
                href={pathToEdit}
                label="Edit"
                primary={true}
               
              />
              
               : <p></p>
        }
        <FacebookProvider appId="1963482977312032" style="display: inline">
                <Share href={pathToShare}>
                  <button type="button">Share on Facebook</button>
                </Share>
              </FacebookProvider>
        </CardActions>
        <CardText expandable={true}>
          {resource.details}
        </CardText>
        </Card>
        </MuiThemeProvider>
    )  ;
  }
}

export default Resource;