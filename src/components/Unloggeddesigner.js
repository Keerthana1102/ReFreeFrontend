import React from 'react';
import axios from 'axios';
import {Dropdown, Label, Icon,  Card, Grid, Search, Header,Input} from 'semantic-ui-react'
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import { Router, Link } from 'react-router-dom';
import "./Trendingdesigns.css";
axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Unloggedesigner extends React.Component{
	constructor (){
		super();
		this.state = {
			persons:[],
			search:"",
			follows:[],
			SideDrawerOpen : false,
			isLoggedIn: false,
			userId:"",
			workExperience:4,
		}
		this.totfol = this.totfol.bind(this);
	}
	

	async componentDidMount(){
	    const response = await axios({url:`http://127.0.0.1:8000/users/`,method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/"})
	    const json = await response.data;
	    this.setState({persons:json.results});
	}

    handleWorkexperienceChange=(event , data) => {
    let  opt= data.value;
    this.setState({workExperience:opt});
	    console.log(this.state.workExperience)
  }


	async totfol(el){
		const followsdata = await axios({url:'http://127.0.0.1:8000/follow/userfollows' , method:'GET' , params:{userId:el} }).then(response=>{return response}).catch(error=>{console.log(error)})
	     console.log(followsdata);
	     const followjson = await followsdata.data;
	     this.setState({follows:followjson})
	}

	renderlist =person => {
		const {persons,search}=this.state;
		var lowercase=String(search).toLowerCase();
		var l1=String(person.username).toLowerCase();
		if( search !== "" && l1.indexOf(lowercase) === -1 ){
	        return null
	    }
        return(
		<div className = "indproject">
		<Link to = {{pathname : "/Unloggeduser" , state:{lookingAt:person.id} }}>
        	<Card
				image={person.profile_photo}
				header={person.username}
				meta={person.workExperience+" yrs"}
				description={person.about}
				extra={
					<a>
				       <i class="users icon"></i>
				       {()=>this.totfol(person.id)}
				       {this.state.follows.length}
				    </a>
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
		const workOptions = [
    {
      key: '0',
      text: '<1 year',
      value: '0',
    },
    {
      key: '1',
      text: '1-2 years',
      value: '1',
    },
    {
      key: '2',
      text: '2-5 years',
      value: '2',
    },
    {
      key: '3',
      text: '>5 years',
      value: '3',
    },
    {
	key:'4',
	text:'No filter',
	value:'4',
     },]
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
	
          <span style={{padding:'2%'}}><Dropdown name="workExperience" value={this.state.workExperience} button  icon='filter' text='Work Experience' labeled className='icon' selection options = {workOptions} onChange={(event,data) =>this.handleWorkexperienceChange(event , data)}/>
</span>
				<Input
                  icon="search"
                  onChange={this.onChange}
                />
			  </Grid.Row>
			  <br/>
			  <Grid.Row>
			  <Card.Group>
				<div className = "projects">
			{this.state.workExperience!=4 && persons.filter(per => per.workExperience == this.state.workExperience).map(person =>{
						return this.renderlist(person);
					}	
					)
				} 
			{this.state.workExperience==4 &&
			persons.filter(per => per.workExperience != this.state.workExperience).map(person =>{
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

