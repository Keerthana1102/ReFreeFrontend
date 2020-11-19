import React from 'react';
import '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import { Grid, Icon } from 'semantic-ui-react';
const toolbar=props=>{
    return(
        <div className="toolbar" style= {{position : 'sticky'}}>
        <Grid padded>
        <Grid.Row color='black'>
	            <Grid.Column width={1}>
	              <Icon name="world" size="big"/>
	            </Grid.Column>
	            <Grid.Column width={14}>
	              <h2>ReFree</h2>
	            </Grid.Column>
                <Grid.Column >
                <DrawerToggleButton click={props.drawerClickHandler}/>
                </Grid.Column>
	    </Grid.Row>
        </Grid>
    </div>
    )};
 export default toolbar;