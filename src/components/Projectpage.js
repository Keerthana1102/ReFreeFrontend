import React, { Component } from 'react'
import axios from 'axios'
import './Projectpage.css'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
class projectpage extends Component {
   
  constructor()
  {
    super();
    this.state = {components : [],finaldesigns : []}

    }

  
  async componentDidMount()
  {
    let cmps = [];
    let des = [];
    
  
    const res = await axios({url:'http://127.0.0.1:8000/component/', method:'get' , withCredentials:true}).then(response=>{return response})
    const js = await res.data;
    console.log(js);
    {js.results.map((cmp)=>{
        if(cmp.project == this.props.project){
        cmps.push(cmp);}
    })}
    console.log(cmps);
    this.setState({components : cmps});
    const response = await axios({url:'http://127.0.0.1:8000/finalDesign/', method:'get' , withCredentials:true}).then(response=>{return response})
    const json = await response.data;
    {json.results.map((design)=>{
      if(design.project === this.props.project){
      des.push(design);}
  })}
  console.log(des);
  this.setState({finaldesigns : des});;
    
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
      
        {this.state.components.reverse().map((cmp) =>
        cmp.upload === null ? <p>{cmp.description}</p> :
        <div className = "component">
            <img src = {cmp.upload}></img>
            <p>{cmp.description}</p>
        </div>
        )}
        {this.state.finaldesigns.reverse().map((des)=>
        <div className = "component">
            <img src = {des.finaldesign}></img>
        </div>
        )}
        </div>)
  }
}
        
    


 


export default projectpage;
