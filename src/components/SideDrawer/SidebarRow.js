import React from 'react'
import "./SidebarRow.css"
function SidebarRow({title}) {
    return (
        <div  className = "sidebarrow">
            <h2  className = "sidebarrow_title">{title}</h2>
        </div>
    )
}

export default SidebarRow;
