import React, { Component } from 'react'
import axios from 'axios'
import './Projectpage.css'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

class projectpage extends Component {
   
  constructor()
  {
    super();
    this.state = {components : [],finaldesigns : [] , data:[] , likedata:[] , likeId:0,hasLiked:false,userId:0,isLoggedIn:false}
	this.likeProject = this.likeProject.bind(this);
          this.unLikeProject = this.unLikeProject.bind(this);

    }

  
  async componentDidMount()
  {
    let cmps = [];
    let des = [];
    const currentuser = await axios({url:'http://127.0.0.1:8000/users/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/error"})
    console.log(currentuser);
     const currentuserjson = await currentuser.data;
     this.setState({userId:currentuserjson.userId});
     console.log(this.state.userId);
     if(this.state.userId==0) {
         window.location.href="http://127.0.0.1:3000/";
     }
     else {
       this.setState({isLoggedIn:true});
     }
  
    const res = await axios({url:'http://127.0.0.1:8000/component/', method:'get' , withCredentials:true}).then(response=>{return response})
    const js = await res.data;
    console.log(js);
    {js.results.map((cmp)=>{
        if(cmp.project == this.props.location.project){
        cmps.push(cmp);}
    })}
    console.log(cmps);
    this.setState({components : cmps});
    const response = await axios({url:'http://127.0.0.1:8000/finalDesign/', method:'get' , withCredentials:true}).then(response=>{return response})
    const json = await response.data;
    console.log(json);
    {json.results.map((design)=>{
      if(design.project == this.props.location.project){
      des.push(design);}
  })}
  console.log(des);
  this.setState({finaldesigns : des});
    const projectdata = await axios({url:`http://127.0.0.1:8000/projects/${this.props.location.project}`, method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
console.log(this.props.location.project)
	    console.log(projectdata)
const pdata = await projectdata.data;
    this.setState({data:pdata});
	    console.log(this.state.data);

	    const likedata = await axios({url:'http://127.0.0.1:8000/like/userlikes' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(likedata);
     const likejson = await likedata.data;
     this.setState({likedata:likejson})
	this.setState({hasLiked:false})
             for(let projectId in this.state.likedata)
     {
             if(this.state.likedata[projectId].project_id == this.props.location.project)
             {
                     this.setState({hasLiked:true})
                     this.setState({likeId:this.state.likedata[projectId].id})
             }
      }
      console.log(this.state.hasLiked)


  }
  drawerToggleClickHandler = () => {
    this.setState((prevState)=>{
      return {SideDrawerOpen: !prevState.SideDrawerOpen};
    });   
  
  };
	
async likeProject(data) {
  const project_id = data;
   console.log(project_id);
  let formData = { user_id:this.state.userId ,project_id: project_id}
    const res = await axios({url:'http://127.0.0.1:8000/like/' ,method:'POST', data:formData , withCredentials:true} ).then(response=>{return response}).catch(error=>{console.log(error)})

  const likedata = await axios({url:'http://127.0.0.1:8000/like/userlikes' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(likedata);
     const likejson = await likedata.data;
     this.setState({likedata:likejson})
        this.setState({hasLiked:false})
	for(let project_id in this.state.likedata)
     {
             if(this.state.likedata[project_id].project_id == this.props.location.project)
             {
                     this.setState({hasLiked:true})
                     this.setState({likeId:this.state.likedata[project_id].id})
             }
      }
      console.log(this.state.hasLiked)
}


async unLikeProject(data) {
  const project_id = data;
   console.log(project_id);
    const res = await axios({url:`http://127.0.0.1:8000/like/${this.state.likeId}` ,method:'DELETE',  withCredentials:true} ).then(response=>{return response}).catch(error=>{console.log(error)})

  const likedata = await axios({url:'http://127.0.0.1:8000/like/userlikes' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(likedata);
     const likejson = await likedata.data;
     this.setState({likedata:likejson})
        this.setState({hasLiked:false})
             for(let project_id in this.state.like)
     {
             if(this.state.likedata[project_id].project_id == this.props.location.project)
             {
                     this.setState({hasLiked:true})
                     this.setState({likeId:this.state.likedata[project_id].id})
             }
      }
      console.log(this.state.hasLiked)
}


  render() {
    let sideDrawer;
    if(this.state.SideDrawerOpen){
      sideDrawer = <SideDrawer />;
    }
    
    return (
      <div>
      <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
      {sideDrawer }
      
        <div style={{padding:'2%'}}>
  	    <div style={{margin:'auto' , width:'100%' ,textAlign:'center'}}><h1 style={{textAlign:'center'}}>{this.state.data.name}</h1>
  	    {!this.state.hasLiked && <Button color='green' onClick={()=>this.likeProject(this.state.data.id)} >Like</Button> }
              {this.state.hasLiked && <Button color='red' onClick={()=>this.unLikeProject(this.state.data.id)} >Remove Like</Button> }
  	    </div>
  	    <h3>Description</h3>
  	    <CKEditor data={this.state.data.description} type="inline" readOnly={true} />
        <h3>Components</h3>
        <br/>
        <div >
        {this.state.components.map((cmp) =>
        cmp.upload === null ? <CKEditor data={cmp.description} type="inline" readOnly={true} /> :
        <div className = "component">
            <img src = {cmp.upload} ></img>
            <CKEditor data={cmp.description} type="inline" readOnly={true} />
            </div>
        )}
        </div>
        <br/>
        <h3>FinalDesigns</h3>
        <br/>
        <div className = "finaldesigns" style = {{display : "flex"}}>
        {this.state.finaldesigns.map((des)=>
        <div className = "component">
            <img src = {des.finaldesign} style = {{height : '200px'},{width:'400px'}}></img>
        </div>
        )}
        </div>
        </div>
        </div>)
  }
}
        
    

class EditorPreview extends Component {
    render() {
        return (
            <div className="editor-preview">
                <br /><h4>Rendered content</h4>
                <div dangerouslySetInnerHTML={ { __html: this.props.data } }></div>
                <br />
        </div>
        );
    }
}

EditorPreview.defaultProps = {
    data: ''
};

EditorPreview.propTypes = {
    data: PropTypes.string
};

 


export default projectpage;
