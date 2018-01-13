
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class Group extends Component {
  constructor(props){
    super(props)
    this.state = {
      group:''
    }
  }
  componentWillMount(){
    if(this.props.match){
      fetch('https://studyonline-dragosstrat.c9users.io:8080/resourcegroups/'+this.props.match.params.id,
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => response.json()).then(json => this.setState({group:json}));
    }
  }
  render() {
    let group = this.props.group;
    group.path = '/groups/' +group.id +'/resources';
    let logged=false;
    if(group === undefined){
      group = this.state.group;
      
    }
    let pathToEdit=''
    if(this.props.userid == group.userid){
      logged=true;
      pathToEdit = '/add/group/' + group.id;
    }
    return (
      <MuiThemeProvider>
        <Card>
        <CardHeader
          title={group.name}
          subtitle="Details"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton
                href={group.path}
                
                label="Resources"
                secondary={true}
               
              />
              {logged ? 
          <FlatButton
                href={pathToEdit}
                label="Edit"
                secondary={true}
               
              />:''
        }
        </CardActions>
        <CardText expandable={true}>
          {group.details}
        </CardText>
        </Card>
        </MuiThemeProvider>
    )  ;
  }
}

export default Group;