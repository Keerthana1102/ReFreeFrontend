import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react'
import Projectpage from '../Projectpage';
function CardExampleCard ({projectname,description,designername,likes}){
    return(
  <Card.Group>
      <Card>
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
  
    </Card>
    
   </Card.Group>
)
    }

export default CardExampleCard