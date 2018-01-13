import React, { Component } from 'react';
import Resource from './Resource.js'
import { Switch, Route } from 'react-router-dom'
import AddAll from './AddAll.js'
import AddResource from './AddResource.js'
import AddGroup from './AddGroup.js'
class Add extends Component{
  render(){
    
    return(
      <Switch>
      <Route exact path='/add' component={AddAll}/>
      <Route exact path='/add/resource' render={()=><AddResource userid={this.props.userid}/>}/>
      <Route path='/add/resource/:id' component={AddResource}/>
      <Route exact path='/add/group' render={()=><AddGroup userid={this.props.userid}/>}/>
       <Route path='/add/group/:id' component={AddGroup}/>
  </Switch>
      );
  }
}
export default Add;