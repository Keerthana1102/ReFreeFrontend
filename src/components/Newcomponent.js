import axios from 'axios'; 

import React,{Component} from 'react'; 
import {Grid,Icon,Header,Form,TextArea,Button} from 'semantic-ui-react';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import ImageUploader from 'react-images-upload';

class App extends Component { 

	constructor(props){
		super(props)
		this.state = { 
			upload: [],
			description: ""
		};
		this.onImgChange=this.onImgChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
	}
	 
	onImgChange (Imgs,ImgUrl) { 
		this.setState({ upload: this.state.upload.concat(Imgs) }); 
		console.log(this.state.upload[this.state.upload.length-1])
	}; 

	onDesChange =event=>{
		this.setState({description: event.target.value});
		console.log(this.state.description)
	}
	
	onSubmit = () => { 
		const formData=new FormData();
		formData.append(
			"upload",this.state.upload[this.state.upload.length-1]
		);
		formData.append(
			"description",this.state.description
		);
		formData.append(
			"project",1
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
				        		withIcon={false}
				        		buttonText="Upload Image"
				        		onChange={this.onImgChange}
				        		maxFileSize={12000000000}
				        		label={"Max Img size:12gb, accepted types .jpg, .png, .gif"}
				        		withPreview={true}
				        		singleImage={true}
				        	/>
						</div> 
						<br/>
						<div class="ui form" style={{ paddingLeft:'7%'}}>
						  <div class="field">
						    <label>Description</label>
						    <textarea 
						    placeholder="Explain your project/photo..."
						    onChange={this.onDesChange}>
						    </textarea>
						  </div>
						 	<button class="ui primary button" 
							  style={{ marginLeft:'47%'}} 
							  onClick={this.onSubmit}>
							  Submit
							</button>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div> 
	); 
	} 
} 

export default App; 
