import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Resources from './Resources'
import Page from './Page'
import Add from './Add'
import Paths from './Paths'
import ResourcesFull from './ResourcesFull'
import Groups from './Groups'
import Logout from './Logout'
import MainPage from './MainPage'
class Main extends Component {
 render(){
     return(<main>
    <Switch>
      <Route exact path='/'  render={()=><MainPage userid={this.props.userid}/>}/>
      <Route path='/resources' render={()=><Resources userid={this.props.userid}/>}/>
      <Route path='/add' render={()=><Add userid={this.props.userid}/>}/>
      <Route path="/learningpaths" render={()=><Paths userid={this.props.userid}/>}/>
      <Route path='/groups' render={()=><Groups userid={this.props.userid}/>}/>
      <Route path='/logout' render={()=><Logout userid={this.props.userid} onLogout={this.props.onLogout}/>}/>
      
    </Switch>
  </main>
)
 } 
}

export default Main
