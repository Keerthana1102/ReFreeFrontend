import React from 'react'
import './Designcard.css'

function designcard({projectname,description,designername,likes}){
    return (
        <div className = "designcard">
            <a href = "/">
            <div className = "designcard_text">
                <h4>{projectname}</h4>
                <h2>{designername}</h2>
                <p>{description}</p>
                <p>
                    {likes} 
                </p>

            </div>
            </a>

        </div>
    );
}

export default designcard
