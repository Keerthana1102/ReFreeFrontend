
import React, { Component } from 'react';
import "./Trendingdesigns.css";
import Designcard from './Designcard';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/projects/'
})
 class Trendingdesigns extends Component {
    state = {
        projects: [],
        users: {}
    }
    constructor() {
        super();
        api.get('/', {
            auth : {
                username : 'Ramya',
                password : 'Saira@05'
            }
        }).then(res => {
            console.log(res.data.results)
            this.setState({projects : res.data.results})
        })
        axios.get('http://127.0.0.1:8000/users/').then((r) => {
       this.setState({users : r.data.results.reduce((acc, value) => {
         acc[value.id] = value
         return acc
       }, {})})
    })


    }



    render() {
        return (
            <div className = "trendingdesigns">
            <h1>Trending Designs</h1>
            <div className = "trendingdesigns_designs">
            {this.state.projects.map(project => <div>
            <Designcard  projectname = {project.name} description={project.description} designername={this.state.users[project.user].username} likes={project.likes}/>
            </div>)}
            </div>

            </div>
        )
    }
}
export default Trendingdesigns;

