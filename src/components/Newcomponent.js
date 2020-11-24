import axios from 'axios'; 

import { Link, Redirect } from 'react-router-dom';
import React,{Component} from 'react'; 
import {Grid,Icon,Header,Form,TextArea,Button} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import ImageUploader from 'react-images-upload';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class App extends Component { 

	constructor(){
		super()
		this.state = { 
			upload: [],
			description: "",
			isLoggedIn: false,
			userId: "",
			proId:""
		};
		this.onImgChange=this.onImgChange.bind(this)
		this.onEditorChange=this.onEditorChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
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
	}

	onImgChange (Imgs,ImgUrl) { 
		this.setState({ upload: this.state.upload.concat(Imgs) }); 
		console.log(this.state.upload[this.state.upload.length-1])
	}; 

	onEditorChange(evt){
	    this.setState({ description:evt.editor.getData() });
	}
	onDesChange =event=>{
		this.setState({description: event.target.value});
		console.log(this.state.description)
	}
	
	onSubmit = async(event) => { 
		event.preventDefault()
		const formData=new FormData();
		if(this.state.upload.length==0) {
			formData.append("upload","");
		}
		else{
			formData.append(
				"upload",this.state.upload[this.state.upload.length-1]
			);
		}
		formData.append(
			"description",this.state.description
		);
		formData.append(
			"project",this.state.proId
		);
		console.log(formData); 
		axios({ url:'http://127.0.0.1:8000/component/' , method:'POST' , data:formData , withCredentials:true })
          .then(response=>{console.log(response);})
          .catch(error=>{console.log(error);})
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
		<div> 
			<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
			{sideDrawer }
			<Grid columns>
				<Grid.Row >
					<Grid.Column width={15}>
						<div style={{ paddingLeft:'7%' }}>
						  <br/>
				          <Header as='h2'>
				            <i class="cloud upload icon"></i>
				            <Header.Content>Upload your work component
				            <Header.Subheader>Add image and description</Header.Subheader>
				            </Header.Content>
				         </Header>
				        </div>

				        <div style={{ paddingLeft:'7%'}}> 
				        	<ImageUploader
				        		withIcon={true}
				        		buttonText="Upload Image"
				        		onChange={this.onImgChange}
				        		maxFileSize={12000000000}
				        		label={"Max Img size:12gb, accepted types .jpg, .png, .gif . After uploading preview can be removed by tapping the cross"}
				        		withPreview={true}
				        		singleImage={true}
				        	/>
						</div> 
						<br/>
						<div class="ui form" style={{ paddingLeft:'7%'}}>
						  <div class="field">
						    <label>Description</label>
						    <CKEditor data={this.state.description} type="inline"  onChange={this.onEditorChange}/>
						    <textarea style={{display:'none'}} value={this.state.description}  onChange={this.onDesChange}/>						    
						  </div>
						  	<Form onSubmit={event=> this.onSubmit(event)}>
						  	<Form.Field>
						  	    <div style={{textAlign:'center'}}>
					              <Link to = {{pathname : "/Editproject",project : this.state.proId}}>
		       						<Button color='blue' type='submit'>Submit</Button>
					              </Link>
					            </div>
					         </Form.Field> </Form>
						 	
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div> 
	); 
	} 
} 

export default App; 
