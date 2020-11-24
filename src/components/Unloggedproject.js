import React, { Component } from 'react'
import axios from 'axios'
import './Projectpage.css'
import UnToolbar from './unloggedtoolbar/untoolbar';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';

class Unloggedproject extends Component {
   
  constructor()
  {
    super();
    this.state = {components : [],finaldesigns : [] , data:[] , likedata:[] , likeId:0,hasLiked:false,userId:0,isLoggedIn:false}

    }

  
  async componentDidMount()
  {
    let cmps = [];
    let des = [];
    
    const res = await axios({url:'http://127.0.0.1:8000/component/', method:'get'}).then(response=>{return response})
    const js = await res.data;
    console.log(js);
    {js.results.map((cmp)=>{
        if(cmp.project == this.props.location.project){
        cmps.push(cmp);}
    })}
    console.log(cmps);
    this.setState({components : cmps});
    const response = await axios({url:'http://127.0.0.1:8000/finalDesign/', method:'get'}).then(response=>{return response})
    const json = await response.data;
    console.log(json);
    {json.results.map((design)=>{
      if(design.project == this.props.location.project){
      des.push(design);}
  })}
  console.log(des);
  this.setState({finaldesigns : des});
    const projectdata = await axios({url:`http://127.0.0.1:8000/projects/${this.props.location.project}`, method:'get'}).then(response=>{return response}).catch(error=>{console.log(error)})
console.log(this.props.location.project)
	    console.log(projectdata)
const pdata = await projectdata.data;
    this.setState({data:pdata});
	    console.log(this.state.data);


  }
  
	


render() {
    
    
    return (
      <div>
      <UnToolbar  />
      <br/>
        <div style={{padding:'5%'}}>
	    <div style={{margin:'auto' , width:'100%' ,textAlign:'center'}}><h1 style={{textAlign:'center'}}>{this.state.data.name}</h1></div>
	    <h3>Description</h3>
	    <CKEditor data={this.state.data.description} type="inline" readOnly={true} />
        <h3>Components</h3>
        <br/>
        <div >
        {this.state.components.map((cmp) =>
        cmp.upload === null ? <p>{cmp.description}</p> :
        <div className = "component">
            <img src = {cmp.upload} ></img>
            <p>{cmp.description}</p>
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

 


export default Unloggedproject;
