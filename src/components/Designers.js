import React from 'react';
import axios from 'axios';
import {Icon,  Card, Grid, Search, Header,Input} from 'semantic-ui-react'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import { Router, Link } from 'react-router-dom';
import "./Trendingdesigns.css";
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Designers extends React.Component{
	constructor (){
		super();
		this.state = {
			persons:[],
			search:"",
			follows:[],
			SideDrawerOpen : false,
			isLoggedIn: false,
			userId:""
		}
		
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
	    const response = await axios({url:`http://127.0.0.1:8000/users/`,method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/"})
	    const json = await response.data;
	    this.setState({persons:json.results});
		let list=[];        
        for(let follower in response.data.results)
        {
        const fdata = await axios({url:"http://127.0.0.1:8000/follow/userfollow/" , method:'GET' ,params:{Id : response.data.results[follower].id} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
        list[response.data.results[follower].id] = fdata.data;
        }
        this.setState({follows : list})

	}

	

	renderlist =person => {
		const {persons,search}=this.state;
		var lowercase=String(search).toLowerCase();
		var l1=String(person.username).toLowerCase();
		if( search !== "" && l1.indexOf(lowercase) === -1 ){
	        return null
	    }
        return(<div className = "indproject">
		<Link to = {{pathname : "/individualuser" , state:{lookingAt:person.id} }}>
        	<Card
				image={person.profile_photo}
				header={person.username}
				meta={person.workExperience+" yrs"}
				description={person.about}
				extra={
					<div>
				       <i class="users icon"></i>
				       {this.state.follows[person.id]}
					   </div>
				}
			/>
		</Link></div>
        );
	};

	onChange=e=>{
		this.setState({search:e.target.value});
	};
	drawerToggleClickHandler = () => {
		this.setState((prevState)=>{
		  return {SideDrawerOpen: !prevState.SideDrawerOpen};
		});   
	
	  };

	render(){
		const {persons,search}=this.state;
		let sideDrawer;
		if(this.state.SideDrawerOpen){
			sideDrawer = <SideDrawer />;
		}
		return(
			<div>
			<Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            { sideDrawer }
			<Grid padded>
	          <Grid.Row width = {4}>
	          	<div style={{ paddingLeft:'1%' }}>
		          <Header as='h2'>
		            <i class="users icon"></i>
		            <Header.Content>Designers
		            <Header.Subheader>Search for designers</Header.Subheader>
		            </Header.Content>
		         </Header>
		        </div>
	          </Grid.Row>
	          <div style={{ paddingLeft:'1%' }}>
	          <Grid.Row >
				<Input
                  icon="search"
                  onChange={this.onChange}
                />
			  </Grid.Row>
			  <br/>
			  <Grid.Row>
			  <Card.Group>
				<div className = "projects">{
					persons.map(person =>{
						return this.renderlist(person);
					}	
					)
				}
				</div>
			  </Card.Group>
			</Grid.Row>
			  </div>
			</Grid>
			</div>
		)
	}
}
