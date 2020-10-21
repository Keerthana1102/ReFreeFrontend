import React , { Component } from 'react';
import { Icon, Button, Segment, Grid, Form, Message, Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Signup extends Component
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
			<div>
			<Grid padded>
			<Grid.Row color='black'>
			<Grid.Column width={1}>
			<Icon name="world" size="big"/>
			</Grid.Column>
			<Grid.Column width={15}>
			<h2>ReFree</h2>
			</Grid.Column>
			</Grid.Row>
			</Grid>
			<Grid celled>                        
                        <Grid.Row>
			<Grid.Column width={6}>
			<span>
			<h2>Built for Designers</h2>
			<p style={{fontSize:'20px'}}>ReFree is a design platform inspired by the way you work. From managing projects to getting hired you can connect with the largest network of desingers on ReFree</p>
			</span>
			</Grid.Column>
                        <Grid.Column width={10}>
			<h2 style={{textAlign:'center'}}>Sign In to ReFree</h2>
                        <Segment>
                                <Form>
                                        <Form.Field>
                                                <label>Username</label>
                                                <input type='text'  />
                                        </Form.Field>
					<Form.Field>
						<label>First Name</label>
						<input type="text" />
					</Form.Field>
					<Form.Field>
						<label>Last Name</label>
						<input type="text" />
					</Form.Field>
					<Form.Field>
						<label>Email ID</label>
						<input type="email" />
					</Form.Field>
					<Form.Field>
						<label>Mobile No</label>
						<input type="text" />
					</Form.Field>
                                        <Form.Field>
                                                <label>Password</label>
                                                <input type='password' />
                                        </Form.Field>
                                        <div style={{textAlign:'center'}}><Button fluid color='green' type='submit'>Sign Up</Button></div>
                                </Form>
                        </Segment>
                        <Message textAlign='center'>
                                Already have an account? <Link to="/">Log In</Link>
</Message>
			</Grid.Column>
			</Grid.Row>
			</Grid>
			</div>
                );
        }
}

export default Signup;
                                                           

