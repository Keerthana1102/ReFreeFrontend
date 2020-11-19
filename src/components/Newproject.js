import axios from 'axios'; 

import React,{Component} from 'react'; 
import {Grid,Icon,Header} from 'semantic-ui-react';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';

class App extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
	// Send formData object 
	axios.post("api/uploadfile", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
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
			<Grid padded>
	          <Grid.Row color='black'>
	            <Grid.Column width={1}>
	              <Icon name="world" size="big"/>
	            </Grid.Column>
	            <Grid.Column width={15}>
	              <h2>ReFree</h2>
	            </Grid.Column>
	          </Grid.Row>
	          <Grid.Row width = {4}>
	          	<div style={{ paddingLeft:'1%' }}>
		          <Header as='h2'>
		            <i class="cloud upload icon"></i>
		            <Header.Content>Upload your work component
		            <Header.Subheader>Add image and description</Header.Subheader>
		            </Header.Content>
		         </Header>
		        </div>
	          </Grid.Row>
	        </Grid>
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
				<button onClick={this.onFileUpload}> 
				Upload! 
				</button> 
			</div> 
		{this.fileData()} 
		</div> 
	); 
	} 
} 

export default App; 
