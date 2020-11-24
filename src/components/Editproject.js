import React,{Component} from 'react';
import axios from 'axios';
import {Icon,  Card, Grid, Search, Header,Input,Button,Form} from 'semantic-ui-react'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import { Router, Link } from 'react-router-dom';
import './Projectpage.css'
import ImageUploader from 'react-images-upload';
import "./Trendingdesigns.css";
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Editproject extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:[],
			SideDrawerOpen : false,
			name:"",
			description:"",
			display:"",
			components:[],
			finaldesigns:[],
			isLoggedIn:false,
			userId:"",
			proId:"",
			extra:[]
		}
		this.onEditorChange=this.onEditorChange.bind(this)
		this.onImgChange=this.onImgChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this);
		this.onSubmitdesigns = this.onSubmitdesigns.bind(this);
		this.onDone = this.onDone.bind(this);
	}
	async componentDidMount(){
		const re = await axios({url:'http://127.0.0.1:8000/users/currentuser', method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/error"})
	    console.log(re);
	    const js = await re.data;
	    this.setState({userId:js.userId});
	    console.log(this.state.userId);
	    if(this.state.userId==0) {
	        window.location.href="http://127.0.0.1:3000/";
	    }
	    else {
	       this.setState({isLoggedIn:true});
	    }

	    this.setState({proId:this.props.location.project})
	   	const response = await axios({url:`http://127.0.0.1:8000/projects/${this.props.location.project}`, method:'get' , withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
	    const json = await response.data;
     	this.setState({data:json});
	    this.setState({name:this.state.data.name})
	   	this.setState({description:this.state.data.description})
	   	this.setState({display:this.state.data.display})

	   	let cmps = [];
   		let des = [];
    	const res = await axios({url:'http://127.0.0.1:8000/component/', method:'get' , withCredentials:true}).then(response=>{return response})
	    const js1 = await res.data;
	    console.log(js1);
	    {js1.results.map((cmp)=>{
	        if(cmp.project == this.props.location.project){
	        cmps.push(cmp);}
	    })}
	    console.log(cmps);
	    this.setState({components : cmps});

	    const response1 = await axios({url:'http://127.0.0.1:8000/finalDesign/', method:'get' , withCredentials:true}).then(response=>{return response})
	    const json1 = await response1.data;
	    console.log(json1);
	    {json1.results.map((design)=>{
	      if(design.project == this.props.location.project){
	      des.push(design);}
		  })}
		  console.log(des);
		  this.setState({finaldesigns : des});

	}

	drawerToggleClickHandler = () => {
	  this.setState((prevState)=>{
	    return {SideDrawerOpen: !prevState.SideDrawerOpen}
	  })
	}

	onnameChange= event =>{
		this.setState({name:event.target.value})
	}

	onEditorChange(evt){
	    this.setState({ description:evt.editor.getData() });
	}
	onDesChange =event=>{
		this.setState({description: event.target.value});
		console.log(this.state.description)
	}
	
	onImgChange (Imgs,ImgUrl) { 
		this.setState({ extra: this.state.extra.concat(Imgs) }); 
		console.log(this.state.extra[this.state.extra.length-1])
	}; 

	onSubmit = async(event) => { 
		event.preventDefault()
		const formData=new FormData();
		formData.append(
			"user",this.state.userId
		);
		formData.append(
			"name",this.state.name
		);
		formData.append(
			"description",this.state.description
		);
		console.log(formData); 
		await axios({ url:`http://127.0.0.1:8000/projects/${this.state.proId}/` , method:'PUT' , data:formData , withCredentials:true })
          .then(response=>{console.log(response);})
          .catch(error=>{console.log(error);})
	}; 
	onDone = async(event)=>{
		window.location.href = "/Profile"
	}

	onSubmitdesigns=async(event)=>{
		const formData=new FormData();
		console.log(this.state.extra.length);
		if(this.state.extra.length!=0) {
			formData.append(
				"finaldesign",this.state.extra[this.state.extra.length-1]
			);
			formData.append("project",this.state.proId);
			console.log(formData);
			await axios({ url:'http://127.0.0.1:8000/finalDesign/' , method:'POST' , data:formData , withCredentials:true })
	          .then(response=>{console.log(response);})
			  .catch(error=>{console.log(error);})
			  
		}
	}

	render(){
		let sideDrawer;
		if(this.state.SideDrawerOpen){
			sideDrawer = <SideDrawer />
		}
		return(
			<div>
			<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            { sideDrawer }

            <div style={{padding:'4%'}}>
		   	  <div style={{margin:'auto' , width:'100%' ,textAlign:'center'}}>
		   	  <h1 style={{textAlign:'center'}}>
		   	   <input type="text" value={this.state.name}  onChange={event => this.onnameChange(event)} />
              </h1>
		   	  </div>
		   	  <h3>Description</h3>
		  	    <CKEditor data={this.state.description} type="inline"  onChange={this.onEditorChange}/>
			    <textarea style={{display:'none'}} value={this.state.description}  onChange={this.onDesChange}/>						    
		       <br/>
	        	<Form onSubmit={event=> this.onSubmit(event)}>
				  	<Form.Field>
				  	    <div style={{textAlign:'center'}}>
			              <Button color='blue' type='submit'>Submit</Button>
			            </div>
			         </Form.Field> 
			    </Form>
		       <h3>Components</h3>
		       <Link to = {{pathname : "/Newcomponent",project : this.state.proId}}>
		       <Button icon labelPosition='left' color="teal" floated="left" >
		        Add component
		        <Icon name='plus'/>
		      </Button></Link>
		      <br/><br/><br/>
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
		        <h3>Final designs</h3>
		        <div className = "finaldesigns" style = {{display : "flex"}}>
			        {this.state.finaldesigns.map((des)=>
			        <div className = "component">
			            <img src = {des.finaldesign} style = {{height : '200px'},{width:'400px'}}></img>
			        </div>
			        )}
			    </div>
			    <br/>
		        <ImageUploader
	        		withIcon={true}
	        		buttonText="Upload final designs"
	        		onChange={this.onImgChange}
	        		maxFileSize={12000000000}
	        		label={"Max Img size:12gb, accepted types .jpg, .png, .gif . After uploading preview can be removed by tapping the cross"}
	        		withPreview={true}
	        		singleImage={true}
	        	/>
	        	<br/>
	        	{/*<Form onSubmitdesigns={event=> this.onSubmitdesigns(event)}>
				  	<Form.Field>
				  	    <div style={{textAlign:'center'}}>
			              <Button color='blue' type='submit'>Submit designs</Button>
			            </div>
			        </Form.Field> 
					</Form>*/}
			    <br/>
	        	<Form>
				  	<Form.Field>

				  		<Link to = {{pathname : "/profile"}}>
				  	    <div style={{textAlign:'center'}}>
			              <button class="ui primary button" 
							  style={{ margin : 'auto'}} 
							  onClick={event=> this.onSubmitdesigns(event)}>
							  Submit
							</button>
			            </div></Link>
						<br/>

				  	    <div style={{textAlign:'center'}}>
			              <button class="ui primary button" 
							  style={{ margin : 'auto'}} 
							  onClick={event=> this.onDone(event)}>
							  Done
							</button>
			            </div>
			        </Form.Field> 
			    </Form>
		    </div>
            </div>
		)
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

