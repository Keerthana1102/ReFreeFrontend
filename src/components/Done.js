import React , { Component } from 'react';
import { Grid, Icon, Button, Segment, Step, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Done extends Component
{
  constructor()
  {
    super();
    this.state = {
      isLoggedIn : false,
      isError : false ,
    }
  }
  async componentDidMount()
  {
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
        <div style={{padding:'2% 10% 2% 10%' , margin:'auto'}}>
          <div style={{textAlign:'center'}}>		  
            <Step.Group>
              <Step disabled link>
                <Icon name='user' />
                <Step.Content>
                <Step.Title>Create Account</Step.Title>
                <Step.Description>Create your account on ReFree</Step.Description>
                </Step.Content>
              </Step>
              <Step disabled link>
                <Icon name='pencil' />
                <Step.Content>
                <Step.Title>Edit profile</Step.Title>
                <Step.Description>Edit your ReFree profile</Step.Description>
                </Step.Content>
              </Step>
             <Step active>
               <Icon name='check' color='green'/>
               <Step.Content>
               <Step.Title>Continue</Step.Title>
               </Step.Content>
             </Step>
           </Step.Group>
         </div>	
         <Message positive>
           <Message.Header>Form Submitted</Message.Header>
           <p>Your form was successfully submitted.</p>
         </Message>
         <div style={{textAlign:'center', padding:'1%'}}><Button color='green' as={Link} to={{pathname:"/profile" }} >Continue</Button></div>
         </div>
       </div>
     );
   }
}


export default Done;
