import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react'
import Projectpage from '../Projectpage';
function CardExampleCard ({projectname,description,designername,likes}){
    return(
  <Card.Group>
      <Card>
      <Link to = {{
        pathname: "/Projectpage",
        state : {designername}
      }}>
    <Card.Content>
      <Card.Header>{projectname}</Card.Header>
      <Card.Description>
      {description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {designername}
      </a>
    </Card.Content>
    <Card.Content extra>
      <a floated='right' size='mini'>
        {likes}
      </a>
    </Card.Content>
    </Link>
    </Card>
    
   </Card.Group>
)
    }

export default CardExampleCard