import React from 'react'
import "./SidebarRow.css"
function SidebarRow({selected,title}) {
    return (
        <div  className = {`sidebarrow ${selected && "selected"}`}>
            <h2  className = "sidebarrow_title">{title}</h2>
        </div>
    )
}

export default SidebarRow;
