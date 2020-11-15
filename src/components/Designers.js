import React from 'react';
import axios from 'axios';
import {Icon, Card, Grid, Search, Header} from 'semantic-ui-react'

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default class Designers extends React.Component{
	state = {
		persons: [],
		search:""
	};

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
	}

	renderperson = person => {
	    const { search } = this.state.search;
	    return (
	      <Card
			href="/profile"
			image={person.profile_photo}
			header={person.username}
			meta={person.workExperience+" yrs"}
			description={person.about}
			extra={
				<a>
			       <i class="users icon"></i>
			       2 Members
			    </a>
			}
		/>
	    );
	  };


	onChange=e=>{
		this.setState({search:e.target.value});
	}

	render(){
		const {search}=this.state.search;
		const filtered = this.state.persons.filter(person => {
		  var lowercase = String(search).toLowerCase();
	      return person.username.toLowerCase().indexOf(lowercase) !== -1;
	    });
		return(
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
		            <i class="users icon"></i>
		            <Header.Content>Designers
		            <Header.Subheader>Search for designers</Header.Subheader>
		            </Header.Content>
		         </Header>
		        </div>
	          </Grid.Row>
	       		<Grid.Column width={4}>
					<Search
						onChange={this.onChange}
					/>
				</Grid.Column>
				<Card.Group>{
					this.state.persons.map(person =>{
						return this.renderperson(person);
					}
					)
				}
			</Card.Group>
			</Grid>
		)
	}
}