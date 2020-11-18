import React , { Component } from 'react';
import { Icon,Card, Grid,Image, Header, Button,List, Divider, Segment, Form, Message, Label, Dropdown} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Individualuser extends Component
{
  constructor()
  {
    super();
    this.state = { 
      isLoggedIn : false,
      userId : "",
      username : "",
      first_name : "",
      last_name : "" ,
      email : "",
      about : "",
      workExperience : "",
      phone_number : "",
      isLoggedIn : false,
      data : [],
      redirect : false,
      failed : false,
      projects :[],
      companies:[],
      links : [],
      follows :[],
      isfollowing : false,
      followId : 0,
    }
	  this.followUser = this.followUser.bind(this);
	  this.unfollowUser = this.unfollowUser.bind(this);
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
     const response = await axios({url:`http://127.0.0.1:8000/users/${js.userId}`,method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location.href="http://127.0.0.1:3000/error"})
     const json = await response.data;
     this.setState({data:json});
     console.log(json);
     this.setState({username:this.state.data.username})
     this.setState({first_name:this.state.data.first_name})
     this.setState({last_name:this.state.data.last_name})
     this.setState({email:this.state.data.email})
     this.setState({phone_number:this.state.data.phone_number})
     this.setState({workExperience:this.state.data.workExperience})
     this.setState({about:this.state.data.about})

     const projectdata = await axios({url:'http://127.0.0.1:8000/projects/userprojects' , method:'GET' , withCredentials:true}).then(response=>{return response}).catch(error=>{window.location="http://127.0.0.1:3000/error"})
     console.log(projectdata);
     const projectjson = await projectdata.data;
     this.setState({projects:projectjson})
     const companydata = await axios({url:'http://127.0.0.1:8000/companies/usercompanies' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(companydata);
     const companyjson = await companydata.data;
     this.setState({companies:companyjson})


     const linkdata = await axios({url:'http://127.0.0.1:8000/socialLinks/userlinks' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(linkdata);
     const linkjson = await linkdata.data;
     this.setState({links:linkjson})

     const followsdata = await axios({url:'http://127.0.0.1:8000/follow/userfollows' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(followsdata);
     const followsjson = await followsdata.data;
     this.setState({follows:followsjson})
	this.setState({isfollowing:false})
     for(let user in this.state.follows)
     {
	     if(this.state.follows[user].following_user_id == this.state.userId)
	     {
		     this.setState({isfollowing:true})
		     this.setState({followId : this.state.follows[user].id})
	     }
      }
	     console.log(this.state.followId)
      console.log(this.state.isfollowing)
  }

async followUser(data) {
  const following_user_id = data;
   console.log(following_user_id);
  let formData = { user_id:this.state.userId ,following_user_id: following_user_id}
    const res = await axios({url:'http://127.0.0.1:8000/follow/' ,method:'POST', data:formData , withCredentials:true} ).then(response=>{return response}).catch(error=>{console.log(error)})

  const followsdata = await axios({url:'http://127.0.0.1:8000/follow/userfollows' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(followsdata);
     const followsjson = await followsdata.data;
     this.setState({follows:followsjson})
	this.setState({isfollowing:false})
	for(let user in this.state.follows)
     {
             if(this.state.follows[user].following_user_id == this.state.userId)
             {
                     this.setState({isfollowing:true})
                     this.setState({followId:this.state.follows[user].id})
             }
      }
      console.log(this.state.isfollowing)
}

async unfollowUser(data) {
  const following_user_id = data;
   console.log(following_user_id);
    const res = await axios({url:`http://127.0.0.1:8000/follow/${this.state.followId}` ,method:'DELETE',  withCredentials:true} ).then(response=>{return response}).catch(error=>{console.log(error)})

  const followsdata = await axios({url:'http://127.0.0.1:8000/follow/userfollows' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(followsdata);
     const followsjson = await followsdata.data;
     this.setState({follows:followsjson})
        this.setState({isfollowing:false})
	     for(let user in this.state.follows)
     {
             if(this.state.follows[user].following_user_id == this.state.userId)
             {
                     this.setState({isfollowing:true})
                     this.setState({followId:this.state.follows[user].id})
             }
      }
      console.log(this.state.isfollowing)
	    console.log(this.state.profile_photo)
}



  render()
  {    
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
    ]
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
        <br/>
        <br/>
        <div style={{margin:'auto' , paddingLeft:'10%' , paddingRight:'10%'}}>
          <Grid stackable columns={2} divided>
	  <Grid.Row>
	  <Grid.Column>
          <Header as='h2'>
            <Icon name='user' />
            <Header.Content>{this.state.first_name} 's Profile
            <Header.Subheader>View user profile</Header.Subheader>
            </Header.Content>
         </Header>
         <br/>
	    {!this.state.isfollowing && <Button color='green' onClick={()=>this.followUser(this.state.userId)} >Follow</Button> }
            {this.state.isfollowing && <Button color='red' onClick={()=>this.unfollowUser(this.state.userId)} >Unfollow</Button> } 
	 <Form>
	   <Divider horizontal>
             <Header as='h4'>
                <Icon name='user circle' />
                Personal Details
              </Header>
          </Divider>
	    <div style={{display:'grid' , gridTemplateColumns:'auto auto'}}>
	    <div style={{paddingRight:'2%'}}>
	  <Form.Field>
            <label style={{fontWegiht:'bold'}}>Username</label>
            <input type="text" value={this.state.username} readOnly/>
	  </Form.Field>
	    </div>
	    <div style={{paddingLeft:'2%'}}>
	    <label style={{fontWeight:'bold'}}>Profile Photo</label>
         <Image src={this.state.data.profile_photo} size="small" /> 
	    </div>
	    </div>
          <div style={{display:'grid' , gridTemplateColumns:'auto auto'}}>
            <div style={{paddingRight:'2%'}}>
              <Form.Field >
                <label style={{fontWeight:'bold'}}>Firstname</label>
                <input type="text" value={this.state.first_name} readOnly />
              </Form.Field>
            </div>
            <div style={{ paddingLeft:'2%'}}>
              <Form.Field >
                <label>Lastname</label>
	        <input type="text" value={this.state.last_name} readOnly/>
              </Form.Field>
	   </div>
          </div>
          <br />
          <br />
	
		 
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='address book' />
              Contact Details
            </Header>
         </Divider>
         <div style={{display:'grid' , gridTemplateColumns:'auto auto' }}>
           <div style={{paddingRight:'2%'}}>
             <Form.Field >
                <label>Phone Number</label>
                <input type="text" value={this.state.phone_number} readOnly />
             </Form.Field>
           </div>
           <div style={{paddingLeft:'2%'}}>
             <Form.Field >
                <label>Email</label>
                <input type="email" value={this.state.email}  readOnly/>
             </Form.Field>
          </div>
          </div>
          <br/>
          <br/>

          <Divider horizontal>
            <Header as='h4'>
              <Icon name='suitcase' />
              Professional Details
            </Header>
          </Divider>

          <Form.Field >
            <label>About</label>
            <CKEditor data={this.state.data.description} type="inline" readOnly={true} />
        </Form.Field>

        <Form.Field >
          <label>Work Experience</label>
          <Dropdown name="workExperience" value={this.state.workExperience}  fluid search selection options = {workOptions} disabled/>
       </Form.Field>
     </Form>
	<br/>
	<br/>
    <Divider horizontal>
            <Header as='h4'>
              <Icon name='industry' />
              Companies
            </Header>
          </Divider>

     <List divided relaxed size='large'>
       {this.state.companies.map(el => (
    <List.Item>
      <List.Icon name='suitcase' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header>{el.company}</List.Header>
        <List.Description as='a'>Postion {el.position} ,
        <span style={{paddingLeft:'10px' , paddingRight:'10px'}}> <Dropdown name="display" value={el.time}   options = {workOptions} disabled/></span>
</List.Description>
      </List.Content>
    </List.Item>
   ))}
    </List>

	   <br/>
	   <br/>
	<Divider horizontal>
            <Header as='h4'>
              <Icon name='tag' />
              Social Links
            </Header>
          </Divider>

     <List divided relaxed size='large'>
       {this.state.links.map(el => (
    <List.Item>
      <List.Icon name='bookmark' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header>{el.name}</List.Header>
        <List.Description as='a'>Link : {el.link} 
</List.Description>
      </List.Content>
    </List.Item>
   ))}
    </List>

    </Grid.Column>
    <Grid.Column>	    
     <Header as='h2'>
       <Icon name='folder' />
       <Header.Content>{this.state.first_name} 's Projects
       <Header.Subheader>View list of projects</Header.Subheader>
       </Header.Content>
     </Header>
     <br />
     <br />
     <Card.Group>
       {this.state.projects.map(el => (
       <Card href='http://127.0.0.1:3000/'>
         <Card.Content>  <Card.Header>{el.name}</Card.Header>
         <Card.Meta>Project Number {el.id}</Card.Meta>
         <Card.Description> {el.description} </Card.Description>
         </Card.Content>
       </Card>
       ))}
     </Card.Group>
     </Grid.Column>
     </Grid.Row>
     </Grid>
    </div>
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
export default Individualuser;
 
