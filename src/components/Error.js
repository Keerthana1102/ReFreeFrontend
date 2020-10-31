import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Button , Message, Icon , Header , Grid} from 'semantic-ui-react';

 
const Error = () => {
  return (
   <div>
     <Grid padded>
       <Grid.Row color='black'>
         <Grid.Column width={1}>
           <Icon name="world" size="big"/>
         </Grid.Column>
         <Grid.Column width={15}>
           <h2>ReFree</h2>
         </Grid.Column>
       </Grid.Row>
       </Grid>
       <br />
       <br />
       <div style={{padding:'2% 10% 2% 10%' , display:'grid'}}>
         <div style={{textAlign:'center' ,fontSize:'40px'}}><p style={{color:'#912d2b'}}>Error !</p></div>
         <Message negative>
           <Message.Header>Oops Sorry</Message.Header>
           <p>There was an error while loading your content.Please be patient or try again later</p>
         </Message>
	 <div style={{textAlign:'center', padding:'1%'}}><Button color='green' as={Link} to={{pathname:"/" }} >Login Page</Button></div>
	</div>
      </div>
    );
}
 
export default Error;
