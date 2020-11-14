import React, { Component, useState } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import { BrowserRouter as Router, Switch,Route } from "react-router-dom";
import Trendingdesigns from './Trendingdesigns';
import PersonalizedFeed from './PersonalizedFeed.js';
import Userslist from './Userslist';
import Favourites from './Favourites.js';
import Profile from './Profile';



class Mainpage extends Component {
  state = {
    SideDrawerOpen : false
  };
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
    <div className = "app" style = {{height:'100%'}}>
      <Router>
      <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
      {sideDrawer }
      <Switch>
      <Route path="/trending" component = {Trendingdesigns} exact />
      <Route path="/personalizedfeed" component = {PersonalizedFeed} />      
      <Route path="/designers" component = {Userslist} exact/>
      <Route path="/favourites" component = {Favourites} />
      <Route path="/profile" component = {Profile} />
     
      
      

      </Switch>
        
      </Router>
      
      
    </div>
    
  );
}
}

export default Mainpage;
