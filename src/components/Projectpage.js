import React, { Component } from 'react'
import axios from 'axios'
class projectpage extends Component {
   
  constructor()
  {
    super();
    this.state = {components : []} 
  }
  async componentDidMount()
  {
    let cmps = [];
    
  
    const res = await axios({url:'http://127.0.0.1:8000/component/', method:'get' , withCredentials:true}).then(response=>{return response})
    const js = await res.data;
    console.log(js);
    {js.results.map((cmp)=>{
        if(cmp.project == this.props.user){
        cmps.push(cmp);}
    })}
    this.setState({components : cmps});
  }
  render() {
      console.log(this.state.components);
    return (
        this.state.components.map((cmp)=>
        <div>
            <h1>{cmp.description}</h1>
            <h1>Welcome</h1>
        </div>
        

        )
    )
        
    
}
} 
 


export default projectpage;
