import React from 'react';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import { Icon } from 'semantic-ui-react';
const toolbar=props=>{
    return(<header className="toolbar">
        <div style={{display:'grid' , justifyContent:'center'}}>
          <Icon name='globe' size='large' />
        </div>
        <nav className = "toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
        </nav>

    </header>
    )};
 export default toolbar;