import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Page from './Page.js'
import Main from './Main'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import MainPage from './MainPage'


class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      userid:'',
      logged:false
    };
   
  }
  
  onUpdate = (id) => {
    this.setState({
      userid: id,
      logged:true
    })
    
  };
  
  onLogout = () =>{
    this.setState({logged:false})
  }
  
  
  render() {
    return (
      <div>
      <div id="fb-root"></div>
      <Page onUpdate={this.onUpdate} loggedIn = {this.state.logged}/>
      {this.state.logged ? <Main userid={this.state.userid} onLogout={this.onLogout}/> : <MainPage/>}
      
      </div>
    );
  }
}

export default App;
