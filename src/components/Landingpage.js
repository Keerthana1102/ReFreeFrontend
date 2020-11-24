import React, { Component } from 'react';
import "./Trendingdesigns.css";
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import UnToolbar from './unloggedtoolbar/untoolbar';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


 class Landingpage extends React.Component {

    state = {userlist : {},SideDrawerOpen : false}
     
    constructor(props) {
        super(props);
        this.state = {projects: [],userlist : {}, userId : "",likeslist:[]}                 
       
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
        let likelist=[];        
        for(let project in response.data.results)
        {
        const likesdata = await axios({url:"http://127.0.0.1:8000/like/projectlikes/" , method:'GET' ,params:{projectId : response.data.results[project].id} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
        likelist[response.data.results[project].id] = likesdata.data;
        }
        console.log(likelist);
        this.setState({likeslist : likelist})
        
        
       
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
            <Link to = {{pathname : "/Unloggeduser" , state:{lookingAt:project.user} }}>
               <i class="users icon"></i>
               {this.state.userlist[project.user]}
               </Link>
               </a>
               <p></p>
      
          <i class="like icon"></i>
          {this.state.likeslist[project.id]}
               <p></p>
          {(new Date(project.creation).getDate() + "-"+ parseInt(new Date(project.creation).getMonth()+1) +"-"+new Date(project.creation).getFullYear())}
          </div>
        }
        />
        </Link>
        </div>
      
      
      
      )
      }
        
      
    
	  
    render() {  
        
        return (
          <div>
          <UnToolbar/>
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

