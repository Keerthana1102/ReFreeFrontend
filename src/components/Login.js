import React , { Component } from 'react';
import { Icon, Button, Segment, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component
{
	constructor()
	{
		super();
		this.state = {
			isLoggedIn : false,
		}
	}
	render()
	{
		return(
			<div style={{margin:'auto' , width:'50%'}}>
			<br />
			<br />
			<div style={{display:'grid' , justifyContent:'center'}}><Icon name='globe' size='huge' /></div>
			<h2 style={{textAlign:'center'}}>Sign In to ReFree</h2>
			<Segment>
				<Form>
					<Form.Field>
						<label>Username</label>
						<input type='text'  />
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input type='password' />
					</Form.Field>
					<div style={{textAlign:'center'}}><Button fluid color='green' type='submit'>Sign In</Button></div>
				</Form>
			</Segment>
			<Message textAlign='center'>
				New to ReFree? <Link to="/">Create an account</Link>
			</Message>
			</div>	
		);
	}
}

export default Login;
