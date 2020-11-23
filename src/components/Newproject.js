import axios from 'axios'; 

import { Link, Redirect } from 'react-router-dom';
import React,{Component} from 'react'; 
import {Grid,Icon,Header,Form,TextArea,Button,Message} from 'semantic-ui-react';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import ImageUploader from 'react-images-upload';
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class App extends Component { 

	constructor(){
		super()
		this.state = { 
			display: [],
			name: "",
			description: "",
			isLoggedIn: false,
			userId: "",
			isError: false
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
	}

	onImgChange (Imgs,ImgUrl) { 
		this.setState({ display: this.state.display.concat(Imgs) }); 
		console.log(this.state.display[this.state.display.length-1])
	}; 

	onnameChange =event=>{
		this.setState({name: event.target.value});
		console.log(this.state.name)
	}

	ondesChange =event=>{
		this.setState({description: event.target.value});
		console.log(this.state.description)
	}

	onEditorChange(evt){
	    this.setState({ description:evt.editor.getData() });
	}

	onSubmit = async(event) => { 
		event.preventDefault()
		if((this.state.display.length===0)||(this.state.description==="")||(this.state.name==="")){
			this.setState({isError: true})
		}
		else{
			const formData=new FormData();
			if(this.state.display.length==0) {
				formData.append("display","");
			}
			else{
				formData.append(
					"display",this.state.display[this.state.display.length-1]
				);
			}
			formData.append(
				"description",this.state.description
			);
			formData.append(
				"name",this.state.name
			);
			formData.append(
				"user",this.state.userId
			);
			console.log(formData); 
			axios({ url:'http://127.0.0.1:8000/projects/' , method:'POST' , data:formData , withCredentials:true })
	          .then(response=>{console.log(response);})
	          .catch(error=>{console.log(error);})
	        window.location.href="http://127.0.0.1:3000/profile";
		}		
	}; 

	drawerToggleClickHandler = () => {
		this.setState((prevState)=>{
		  return {SideDrawerOpen: !prevState.SideDrawerOpen};
		});    
	};
	
	render(){
		let sideDrawer;
		if(this.state.SideDrawerOpen){
		  sideDrawer = <SideDrawer />;
		}
		return(
			<div>
				<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
				{sideDrawer }
				<Grid columns>
					<Grid.Row>
						<Grid.Column width={15}>
							<div style={{ paddingLeft:'7%' }}>
							  <br/>
					          <Header as='h2'>
					            <i class="dropbox icon"></i>
					            <Header.Content>Create new project
					            <Header.Subheader>Fill required fields</Header.Subheader>
					            </Header.Content>
					          </Header>
					          <div class="ui form">
					          <Form.Field >
					            <label >Project Name</label>
					            <input type="text" value={this.state.name} onChange={this.onnameChange}/>
					          </Form.Field>
							   <div class="field">
							    <label>Project Description</label>
							    <CKEditor data={this.state.description} type="inline"  onChange={this.onEditorChange}/>
							    <textarea style={{display:'none'}} value={this.state.description} onChange={this.ondesChange}/>
							   </div>
							   <div>
							   	   <div class="field">
							   	   <label>Upload Cover photo</label>
							   	   </div>
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
							    <button class="ui primary button" 
								  style={{ marginLeft:'47%'}} 
								  onClick={event=> this.onSubmit(event)} >
								  Submit
								</button>
								{this.state.isError && <Message negative><Message.Header>Please fill all required fields</Message.Header></Message>}
							  </div>
					        </div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
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