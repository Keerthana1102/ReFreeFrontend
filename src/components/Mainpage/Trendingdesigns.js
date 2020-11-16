
import React, { Component } from 'react';
import "./Trendingdesigns.css";
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react'
import Projectpage from '../Projectpage';
import { Link } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


 class Trendingdesigns extends React.Component {

    state = {userlist : {}}
     
    constructor(props) {
        super(props);
        this.state = {projects: [],userlist : {}, userId : ""}                 
       
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
        axios.get('http://127.0.0.1:8000/users/', {withCredentials:true} ).then((r) => {
        this.setState({userlist : r.data.results.reduce((acc, value) => {
          acc[value.id] = value.username
          return acc
        }, {})})})
        
        
       
      }
      renderproject = project => {
        return (
          
          <Card href  = "/Projectpage"
        image={project.display}
        header={<CKEditor data={project.name} type = 'inline' readOnly={true} />}
        description={<CKEditor data={project.description} type="inline" readOnly={true} />}
        extra={
          <div>
          <a>
            <Link to = "/individualuser">
               <i class="users icon"></i>
               {this.state.userlist[project.user]}
               </Link>
               </a>
               <p></p>
          <a>
               <i class="like icon" size='mini'>
               {project.likes}
               </i>
          </a>
          <p></p>
          {project.creation}
          </div>
          

        }
      />
      
      
      );
      };
        
        
    
      
    
    
	  
    render() {  
        return (
            <div className = "trendingdesigns">
            <h1>Trending Designs</h1>
            <Card.Group>{
					this.state.projects.map(project =>{
						return this.renderproject(project);
					}
					)
				}
			</Card.Group>
     {/* <Projectpage project = "5"/>*/}

           
            </div>
        
            
        )
    }
}
export default Trendingdesigns;

