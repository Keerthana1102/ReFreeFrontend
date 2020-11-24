import React from 'react';
import './unloggedtoolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Grid, Icon } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
const toolbar=props=>{
    return(
        <div className="toolbar" style= {{position : 'sticky'}}>
        <Grid padded>
        <Grid.Row color='black'>
	            <Grid.Column width={1}>
	              <Icon name="world" size="big"/>
	            </Grid.Column>
	            <Grid.Column width={10}>
	              <h2>ReFree</h2>
	            </Grid.Column>
                <Link to = "/" style={{ marginRight: '20px', textDecoration: 'none' , color : "white"}}>
                <Grid.Column width={2}>
                <h2 >Trending</h2>
                </Grid.Column>
                 </Link>
                <Link to = "/unloggeddesigner" style={{marginRight: '20px', textDecoration: 'none' , color : "white"}}>
                <Grid.Column  width={2} >
                <h2>Designers</h2>
                </Grid.Column>
                </Link>
                <Link to = "/login" style={{marginRight: '20px', textDecoration: 'none' , color : "white"}}>
                <Grid.Column width={2}>
                <h2>Login</h2>
                </Grid.Column>
                </Link>
                <Link to = "/Signup" style={{marginRight: '20px', textDecoration: 'none' , color : "white"}}>
                <Grid.Column  width={1} >
                <h2>Signup</h2>
                </Grid.Column>
                </Link>
	    </Grid.Row>
        </Grid>
    </div>
    )};
 export default toolbar;