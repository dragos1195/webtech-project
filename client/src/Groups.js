import React, { Component } from 'react';
import ResourcesFull from './ResourcesFull.js'
import { Switch, Route } from 'react-router-dom'
import GroupsFull from './GroupsFull.js'
class Groups extends Component{
  render(){
    return(
      <Switch>
     <Route exact path='/groups' component={GroupsFull}/>
      <Route path='/groups/:idd/resources' render={({match}) => <ResourcesFull userid={this.props.userid} match={match} />}/>
      <Route exact path='/groups/me/' render={()=><GroupsFull userid={this.props.userid}/>}/>
  </Switch>
      );
  }
}
export default Groups;