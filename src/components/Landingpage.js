import React, { Component } from 'react';
import "./Trendingdesigns.css";
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


 class Landingpage extends React.Component {

    state = {userlist : {},SideDrawerOpen : false}
     
    constructor(props) {
        super(props);
        this.state = {projects: [],userlist : {}, userId : ""}                 
       
    }
        async componentDidMount()
        {
         
       	const response = await axios(
        {url:'http://127.0.0.1:8000/projects/',method:'GET' }).then(response=>{return response}
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
            <div className = "indproject">
              <Link to = {{pathname : "/Unloggedproject",project : project.id}}>
          <Card 
        image={project.display}
        header={<CKEditor data={project.name} type = 'inline' readOnly={true} />}
        description={<CKEditor data={project.description} type="inline"  readOnly={true} />}
        extra={
          <div>
          <a>
            <Link to = {{pathname : "/individualuser" , state:{lookingAt:project.user} }}>
               <i class="users icon"></i>
               {this.state.userlist[project.user]}
               </Link>
               </a>
               <p></p>
      
          <i class="like icon"></i>
          {project.likes}
               <p></p>
          {(new Date(project.creation).getDate() + "-"+ parseInt(new Date(project.creation).getMonth()+1) +"-"+new Date(project.creation).getFullYear())}
          </div>
        }
        />
        </Link>
        </div>
      
      
      
      )
      }
        
      drawerToggleClickHandler = () => {
        this.setState((prevState)=>{
          return {SideDrawerOpen: !prevState.SideDrawerOpen};
        });   
    
      };  
    
    
	  
    render() {  
        let sideDrawer;
        if(this.state.SideDrawerOpen){
          sideDrawer = <SideDrawer />;
        }
        return (
          <div>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          {sideDrawer } 
          <div className = "trendingdesigns">
          <h1>Trending Designs</h1>
          <div className = "projects">
          <Card.Group> 
          {
					this.state.projects.map(project =>{
						return this.renderproject(project);
					}
					)
				}
        </Card.Group>
        </div>
        
           
            </div>
            </div>
        
            
        )
    }
}
export default Landingpage;

