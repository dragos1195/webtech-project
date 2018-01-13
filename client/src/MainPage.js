import React, { Component } from 'react';
import Resource from './Resource.js'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
class MainPage extends Component{
    constructor(props){
        super(props);
        this.state={logged : false}
    }
    componentDidMount = () =>{
        if(this.props.userid){
            this.setState({logged:true});
        }
    }
  render(){
    
    return(
      <div>
      {this.state.logged ? <Redirect to={'/resources'}/> : <div align="center"><h1>Please login</h1><br/><a  href="https://studyonline-dragosstrat.c9users.io:8080/auth/facebook">Login with Facebook</a></div>}
        </div>
      );
  }
}
export default MainPage