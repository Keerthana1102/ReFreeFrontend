import "./SideDrawer.css";
import React,{Component} from 'react'
import SidebarRow from "./SidebarRow"
import { Link } from "react-router-dom";
import axios from 'axios'

class SideDrawer extends Component {
   
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
                <Link to={"/"}>      
                <SidebarRow title = "Logout" />
                </Link> 
                
            </div>
        )
    }
}
export default SideDrawer
