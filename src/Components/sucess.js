import React, { Component } from 'react';
import Home from './Home1';
import suc from './image/success.gif'
import {Button,Modal,Form,Card} from 'react-bootstrap';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams} from 'react-router-dom';
class success extends Component {
    constructor(props){
        super(props);
        this.state={redirect:false}}
    
    render() {
        const{redirect}=this.state;
        if(redirect)
        {
          const { searchQuery } = this.state;
         
        return <Navigate to={'/login'} />;
      
  
        };

        return (
            <div>
                <Home/>
                <br></br>
                <center>
                <br></br>
               
                <br></br>
                <h3 >Registration completed successfully</h3>
              
                <img src={suc} className="icon"  />
                </center>
                <Button id="ch"variant="primary" className='Button'onClick={()=>this.setState({redirect:true})}>Move to Login</Button>
                

                
               
                
            </div>
        );
    }
}

export default success;