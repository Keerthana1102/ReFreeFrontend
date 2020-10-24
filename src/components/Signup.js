import React , { Component } from 'react';
import { Icon, Button, Segment, Grid, Form, Message, Item, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Signup extends Component
{
  constructor()
  {
    super();
    this.state = {
      isLoggedIn : false,
      username : "",
      password : "",
      confpassword : "",
      email : "",
      firstname : "",
      lastname : "",
      phone_number : "",
      error : false,
      isError : false,
    }
  }
  handleUsernameChange = event => {
    this.setState({ username : event.target.value })
  }
  handleFirstnameChange = event => {
    this.setState({ firstname : event.target.value })
  }
  handleLastnameChange = event => {
    this.setState({ lastname : event.target.value })
  }
  handlePasswordChange = event => {
    this.setState({ password : event.target.value })
  }
  handleConfPasswordChange = event => {
    this.setState({ confpassword : event.target.value })
  }
  handleEmailChange = event => {
    this.setState({ email : event.target.value })
  }
  handlePhoneChange = event => {
    this.setState({ phone_number : event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    if(this.state.password === this.state.confpassword)
    {
       this.setState({error:false});
    }
    if(this.state.password !== this.state.confpassword)
    { 
      this.setState({error:true});
    }
    else if((this.state.username === "") || (this.state.password === "") || (this.state.firstname === "") || (this.state.lastname === "") || (this.state.phone_number === "") || (this.state.email === ""))
    {
      this.setState({isError:true});
    }
    else
    {
      let formData = { username : this.state.username , firstname:this.state.firstname , lastname:this.state.lastname , email:this.state.email , phone_number:this.state.phone_number , password : this.state.password }
    console.log(formData);
          axios({ url:'http://127.0.0.1:8000/users/signup' , method:'POST' , data:formData , withCredentials:true })
          .then(response=>{console.log(response);})
          .catch(error=>{console.log(error);})
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
                <Form onSubmit={event => this.handleSubmit(event)}>
                   <Form.Field required>
                      <label>Username</label>
                      <input type='text' value={this.state.username} onChange={this.handleUsernameChange} />
                   </Form.Field>
                   <Form.Field required>
                     <label>First Name</label>
                     <input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange}/>
                    </Form.Field>
                    <Form.Field required>
                      <label>Last Name</label>
                      <input type="text" value={this.state.lastname} onChange={this.handleLastnameChange}/>
                    </Form.Field>
                    <Form.Field required>
                      <label>Email ID</label>
                      <input type="email" value={this.state.email} onChange={this.handleEmailChange}/>
                    </Form.Field>
                    <Form.Field required>
                      <label>Mobile No</label>
                      <input type="text" value={this.state.phone_number} onChange={this.handlePhoneChange}/>
                    </Form.Field>
                    <Form.Field required>
                       <label>Password</label>
                       <input type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
                    </Form.Field>
                    <Form.Field required>
                       <label>Confirm Password</label>
                       <input type='password' value={this.state.confpassword} onChange={this.handleConfPasswordChange}/>
                    </Form.Field>
                    {this.state.error && <Message negative>Confirm password must match Password </Message> }
                    <div style={{textAlign:'center'}}>
                      <Button fluid color='green' type='submit'>Sign Up</Button>
                    </div>
                  </Form>
                  {this.state.isError && <Message negative><Message.Header>Please fill all required fields</Message.Header></Message>}
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
                                                           

