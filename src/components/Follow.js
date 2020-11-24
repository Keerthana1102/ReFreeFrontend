import React , { Component } from 'react';
import { Icon,Card, Grid,Image, Header, Button,List, Divider, Segment, Form, Message, Label, Dropdown} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';
import PropTypes from 'prop-types';

axios.defaults.xsrfCookieName = 'frontend_csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class Follow extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isLoggedIn : false,
      userId : "",
      followersId : [],
      followingId : [],
      following : [],
      followers : [],
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
	     const followsdata = await axios({url:'http://127.0.0.1:8000/follow/userfollows' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(followsdata);
     const followjson = await followsdata.data;
	  let newarr = [];
     this.setState({followingId:followjson})
	  for(let user in this.state.followingId)
     {
             console.log(this.state.followingId[user].following_user_id)
             const userdata = await axios({url:`http://127.0.0.1:8000/users/${this.state.followingId[user].following_user_id}` , method:'GET'  ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(userdata);
     const userjson = await userdata.data;
             console.log(userjson)
		     newarr.push(userdata)
             console.log(newarr)
      }
          console.log(newarr);
      this.setState({following:newarr})


     const followingdata = await axios({url:'http://127.0.0.1:8000/follow/userfollowing' , method:'GET' , params:{userId:this.state.userId} ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(followingdata);
     const followingjson = await followingdata.data;
     this.setState({followersId:followingjson})
	     let narr = [];
	     for(let user in this.state.followersId)
     {
             console.log(this.state.followersId[user].user_id)
             const usedata = await axios({url:`http://127.0.0.1:8000/users/${this.state.followingId[user].user_id}` , method:'GET'  ,withCredentials:true}).then(response=>{return response}).catch(error=>{console.log(error)})
     console.log(usedata);
     const usejson = await usedata.data;
             console.log(usejson)
                     narr.push(usedata)
             console.log(newarr)
      }
          console.log(newarr);
      this.setState({followers:newarr})
  }
  drawerToggleClickHandler = () => {
        this.setState((prevState)=>{
          return {SideDrawerOpen: !prevState.SideDrawerOpen};
        });   
    
      }; 

render()
{
  let sideDrawer;
        if(this.state.SideDrawerOpen){
          sideDrawer = <SideDrawer />;
        }
        return (
          <div>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          {sideDrawer }
	<div style={{padding:'2%'}}>
		 <Header as='h2'>
       <Icon name='user' />
       <Header.Content>Followers
       <Header.Subheader>View list of followers</Header.Subheader>
       </Header.Content>
     </Header>
     <br />
     <Card.Group>
       {this.state.followers.map(el => (
	       <div style={{padding:'2%'}}>
       <Link to = {{pathname : "/Individualuser", state:{lookingAt : el.data.id}}}>
       <Card>
         <Card.Content>  <Card.Header>{el.data.first_name} {el.data.last_name}</Card.Header>
         <Card.Meta>Username {el.data.username}</Card.Meta>
         <Card.Description> <CKEditor data={el.data.about} type="inline" readOnly={true} />
 </Card.Description>
         </Card.Content>
       </Card>
        </Link>
	       </div>
       ))}
     </Card.Group>
<Header as='h2'>
       <Icon name='user' />
       <Header.Content>Following
       <Header.Subheader>View list of following</Header.Subheader>
       </Header.Content>
     </Header>
     <br />
     <Card.Group>
       {this.state.following.map(el => (
	       <div style={{padding:'2%'}}>
       <Link to = {{pathname : "/Individualuser", state:{lookingAt : el.data.id}}}>
       <Card>
         <Card.Content>  <Card.Header>{el.data.first_name} {el.data.last_name}</Card.Header>
         <Card.Meta>Username {el.data.username}</Card.Meta>
         <Card.Description> <CKEditor data={el.data.about} type="inline" readOnly={true} />
 </Card.Description>
         </Card.Content>
       </Card>
        </Link>
	       </div>
       ))}
     </Card.Group>
</div>
	</div>
	);
}
}


export default Follow;

