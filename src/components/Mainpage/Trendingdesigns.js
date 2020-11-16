
import React, { Component } from 'react';
import "./Trendingdesigns.css";
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react'
import Projectpage from '../Projectpage';
import { Link } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


 class Trendingdesigns extends React.Component {

    state = {userlist : {},finaldesigns : {}}
     
    constructor(props) {
        super(props);
        this.state = {projects: [],userlist : {}, userId : "",finaldesigns : {}}
        axios.get('http://127.0.0.1:8000/users/', {withCredentials:true} ).then((r) => {
        this.state.userlist = r.data.results.reduce((acc, value) => {
          acc[value.id] = value.username
          return acc
        }, {})})
         axios.get('http://127.0.0.1:8000/finalDesign/', {withCredentials:true} ).then((r) => {
        this.state.finaldesigns = r.data.results.reduce((acc, value) => {
          acc[value.project] = value.finaldesign
          return acc
        }, {})})
         
       
    }
        async componentDidMount()
        {
         
          const res = await axios({url:'http://127.0.0.1:8000/users/currentuser/', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/fail"})
          

        const js =  await res.data;
        this.setState({userId:js.userId});
        if(this.state.userId==0)
        {
                
                window.location.href="http://127.0.0.1:3000/";
        }
    	const response = await axios(
        {url:'http://127.0.0.1:8000/projects/',method:'GET' ,  withCredentials:true }).then(response=>{return response}
        )
        const json = response.data.results;
        this.setState({projects:json}); 
        
        await axios.get('http://127.0.0.1:8000/finalDesign/', {withCredentials:true} ).then((r) => {
        this.state.finaldesigns = r.data.results.reduce((acc, value) => {
          acc[value.project] = value.finaldesign
          return acc
        }, {})})
        await axios.get('http://127.0.0.1:8000/users/', {withCredentials:true} ).then((r) => {
        this.state.userlist = r.data.results.reduce((acc, value) => {
          acc[value.id] = value.username
          return acc
        }, {})})
        
        }
        
    
      
    
    
	  
    render() {  
        return (
            <div className = "trendingdesigns">
            <h1>Trending Designs</h1>
            <div className = "trendingdesigns_designs">
             
            <div className = "card">
            <Card.Group>
            {this.state.projects.map(project =>
            <Link to = {{pathname : "/Projectpage" ,aprops :{user : project.user}}}>
            <Card>
                <div style={{width : '725px',height : '100%' }}>            <Image src = {this.state.finaldesigns[project.id]} />
            </div>
            <Card.Content>
            <Card.Header>{project.name}</Card.Header>
            <Card.Description>
            {project.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
            <Icon name='user' />
            {this.state.userlist[project.user]}
            </a>
            </Card.Content>
            <Card.Content extra>
            <a floated='right' size='mini'>
            {project.likes}
            </a>
            </Card.Content> 
            </Card>
            </Link>  )}  
           
            </Card.Group>
            </div>
            

            </div>

            </div>
            
        )
    }
}
export default Trendingdesigns;

