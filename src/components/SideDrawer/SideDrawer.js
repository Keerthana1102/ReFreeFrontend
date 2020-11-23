import "./SideDrawer.css";
import React,{Component} from 'react'
import SidebarRow from "./SidebarRow"
import { Link } from "react-router-dom";
import axios from 'axios'

class SideDrawer extends Component {
  async logout ()  {
    const response = await axios({url:'http://127.0.0.1:8000/users/logoutview/', method:'get' , withCredentials:true}).then(response=>{return response})
      console.log(response.data);
    }
   
    render() {
        return (
            <div className = "Sidebar">
                <Link to={"/Trending"}>
                <SidebarRow title = "Trending"/>
                </Link>
                <Link to={"/personalizedfeed"}>
                <SidebarRow title = "Personalized feed"/>
                </Link>
                <Link to={"/Designers"}>
                <SidebarRow title = "Designers"/>
                </Link>
                <Link to={"/Favourites"}>
                <SidebarRow title = "Favourites"/>
                </Link> 
                <Link to={"/Profile"}>
                <SidebarRow title = "Profile"/>
                </Link> 
                <a href = "/" onClick={this.logout}>      
                <SidebarRow title = "Logout" />
                </a> 
                
            </div>
        )
    }
}
export default SideDrawer
