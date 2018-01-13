import React, { Component } from 'react';
import Path from './Path.js'
import { Switch, Route } from 'react-router-dom'
import PathsFull from './PathsFull.js'
import GroupsFull from './GroupsFull'
class Resources extends Component{
  render(){
    return(
      <Switch>
     <Route exact path='/learningpaths' component={PathsFull}/>
      <Route exact path='/learningpaths/:id' component={Path}/>
      <Route path='/learningpaths/:id/groups' component={GroupsFull} />
  </Switch>
      );
  }
}
export default Resources;