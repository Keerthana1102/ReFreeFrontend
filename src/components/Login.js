import React , { Component } from 'react';
import { Icon, Button, Segment, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Login extends Component
{
  constructor()
  {
    super();
    this.state = {
      isLoggedIn : false,
      username : "",
      password : "",
      isError : false ,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange = event => {
    this.setState({ username : event.target.value })
  }
  handlePasswordChange = event => {
    this.setState({ password : event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    if((this.state.username==="") || (this.state.password === ""))
    {
      this.setState({isError : true})
    }
    else
    {
      let formData = { username : this.state.username , password : this.state.password }
      console.log(formData);
      axios({ url:'http://127.0.0.1:8000/users/loginview/' , method:'POST' , data:formData , withCredentials:true })
      .then(response=>{console.log(response);})
      .catch(error=>{console.log(error);})
    }
  }
  render()
  {
    return(
      <div style={{margin:'auto' , width:'50%'}}>
        <br />
        <br />
        <div style={{display:'grid' , justifyContent:'center'}}>
          <Icon name='globe' size='huge' />
        </div>
        <h2 style={{textAlign:'center'}}>Sign In to ReFree</h2>
        <Segment>
          <Form onSubmit={event => this.handleSubmit(event)}>
            <Form.Field required>
              <label>Username</label>
              <input type='text' value= {this.state.username} onChange={this.handleUsernameChange }  />
            </Form.Field>
            <Form.Field required>
               <label>Password</label>
               <input type='password' value= {this.state.password} onChange={this.handlePasswordChange} />
            </Form.Field>
            <div style={{textAlign:'center'}}>
              <Button fluid color='green' type='submit'>Sign In</Button>
            </div>
          </Form>
         {this.state.isError && <Message negative><Message.Header>Please fill all required fields</Message.Header></Message>}
        </Segment>
        <Message textAlign='center'>
          New to ReFree? <Link to="/signup">Create an account</Link>
        </Message>
      </div>	
    );
  }
}

export default Login;
