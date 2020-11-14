
import React, { Component } from 'react';
import "./Trendingdesigns.css";
import Designcard from './Designcard';
import axios from 'axios';
import Projectpage from '../Projectpage';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


 class Trendingdesigns extends Component {
     
    constructor() {
        super();
        this.state = { users: {}, projects: [], userId : ""}
        axios.get('http://127.0.0.1:8000/users/').then((r) => {
       this.setState({users : r.data.results.reduce((acc, value) => {
         acc[value.id] = value
         return acc
       }, {})})
    })
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

    }
    
	  
    render() {
        return (
            
            <div className = "trendingdesigns">
            <h1>Trending Designs</h1>
            <div className = "trendingdesigns_designs">
            {this.state.projects.map(project =><div>
            <Designcard  projectname = {project.name} description={project.description} designername = {"Ramya"} /*designername = {this.state.users[1].username}*/ likes={project.likes}/>
            </div>)
            }
            </div>

            </div>
            
        )
    }
}
export default Trendingdesigns;

