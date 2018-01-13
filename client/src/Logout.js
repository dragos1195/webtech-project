import React, { Component } from 'react';
import Resource from './Resource.js'
import { Switch, Route } from 'react-router-dom'
import ResourcesFull from './ResourcesFull.js'
import { Redirect } from 'react-router'
class Logout extends Component{
    constructor(props){
        super(props);
        this.state={out : false}
    }
    componentDidMount = () =>{
        
        if(this.props.userid){
            console.log('aici')

        fetch('https://studyonline-dragosstrat.c9users.io:8080/logout',
    {
      method: 'GET',
      credentials: 'include'
    }
    ).then(response => this.setState({out:true}));
    this.props.onLogout();
    }
    }
  render(){
    console.log(this.state.out)
    return(
        
        <div>
        
        </div>
      );
  }
}
export default Logout;