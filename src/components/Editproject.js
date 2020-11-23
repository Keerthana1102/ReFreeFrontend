import React from 'react';
import axios from 'axios';
import {Icon,  Card, Grid, Search, Header,Input} from 'semantic-ui-react'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import { Router, Link } from 'react-router-dom';
import "./Trendingdesigns.css";
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Editproject extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			name:"",
			description:"",
			display:[],
			component:[],
			finaldesign:[],
			isLoggedIn:false,
			userId:""
		}
	}
	async componentDidMount(){
		const re = await axios({url:'http://127.0.0.1:8000/users/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/error"})
	    console.log(re);
	    const js = await re.data;
	    this.setState({userId:js.userId});
	    console.log(this.state.userId);
	    if(this.state.userId==0) {
	        window.location.href="http://127.0.0.1:3000/";
	    }
	    else {
	       this.setState({isLoggedIn:true});
	    }
	    console.log(this.props)
	    const response = await axios({url:'http://127.0.0.1:8000/projects/${this.props.location.state.lookingAt}',method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/"})
	    const json = await response.data;
	    this.setState({data:json});
	    console.log(json);
	    // 
	    this.setState({name:this.state.data.name})
     	this.setState({description:this.state.data.description})
     	this.setState({display:this.state.data.display})

	}
}