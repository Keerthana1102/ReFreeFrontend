import React from 'react';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar=props=>{
    return(<header className="toolbar">
        
        <nav className = "toolbar_navigation">
            <div>
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
        </nav>

    </header>
    )};
 export default toolbar;