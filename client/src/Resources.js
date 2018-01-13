import React, { Component } from 'react';
import Resource from './Resource.js'
import { Switch, Route } from 'react-router-dom'
import ResourcesFull from './ResourcesFull.js'
class Resources extends Component{
  render(){
    
    return(
      <Switch>
     <Route exact path='/resources' render={()=><ResourcesFull userid={this.props.userid}/>}/>
      <Route path='/resources/:id'render={({match}) => <Resource userid={this.props.userid} match={match} />} />
  </Switch>
      );
  }
}
export default Resources;