import "./SideDrawer.css";
import React from 'react'
import SidebarRow from "./SidebarRow"
import { Link } from "react-router-dom";
function Sidebar() {
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
            <Link to={"/favourites"}>
            <SidebarRow title = "Favourites"/>
            </Link>
            <Link to={"/Profile"}>
            <SidebarRow title = "Profile"/>
            </Link>
            
            

        </div>
    )
}          
            

export default Sidebar
