
import React, { Component } from 'react';
import {Button,Modal,Form,Card} from 'react-bootstrap';
import Home1 from './Home1';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams} from 'react-router-dom';
export default class Forgetpwd extends Component{

 constructor(props){
    super(props);
    this.state={snackbaropen:false,snackbarmsg:'', password: '', redirect:false,   confirmPassword: '',    passwordMatch: false,}
    this.handleSubmit=this.handleSubmit.bind(this);
 }
 snackbarclose=(event)=>{
    this.setState({snackbaropen:false});
 }


 handleSubmit(event){
    event.preventDefault();
    if (event.target.pwd.value === event.target.cpwd.value) {

        
  

      // Passwords match, proceed with form submission logic
      // For example: You can make an API call or perform any other action here

      console.log('Form submitted successfully!');
      
        
     
     const loginId= event.target.loginId.value;
     const data={
        "confirmPassword": event.target.cpwd.value,
        "password": event.target.pwd.value
      }
    fetch(`http://localhost:8080/api/v1.0/moviebooking/${loginId}/forgot`, {
      method: 'PUT',
     
      headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        
      },
      body:JSON.stringify(data),
  }).then(response => response.text())
      .then(data => {this.setState({redirect:true})})    
      .catch(error => {this.setState({snackbaropen:true,snackbarmsg:'Failed'},console.log(error))})
    } else {
      // Passwords don't match, handle the error
      console.error('Passwords do not match!');
      this.setState({ passwordMatch:true });
    }
  
   
    let token=localStorage.getItem('login')
    
  
   



 }
    render(){
      const { password, confirmPassword, passwordMatch,redirect } = this.state;
      if(redirect)
      {
        alert("password has been changed successfully");
        
      return <Navigate to={'/login'} />;
    

      };
        return( 
        <div>
            <Snackbar
  anchorOrigin={{ vertical:'center', horizontal:'center' }}
  open={this.state.snackbaropen}
  autoHideDuration={3000}
  severity="success"
  onClose={this.snackbarclose}
  message={<span id="msg-id">{this.state.snackbarmsg}</span>}
action={[
    <IconButton key="close"
    aria-label='inherit'
    onClick={this.snackbarclose}
    
    >x</IconButton>
]}
/>
<Home1/>
    <Card border="dark" class="row" style={{ width: '28rem' }} className='card2'>
    <Card.Header><center> Forget password</center></Card.Header>
    <Card.Body>
            <Form  onSubmit={this.handleSubmit}>
            <Form.Group className="mb-0" controlId="loginId">
              <Form.Label>LoginId</Form.Label>
              <Form.Control type="text" placeholder="Enter LoginId" pattern='[a-zA-Z0-9]+' required />
             
            </Form.Group>
            
            
          
            <Form.Group className="mb-0" controlId="pwd">
              <Form.Label >Password</Form.Label>
              <Form.Control type="password"  placeholder="Enter password"  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"  onInvalid={(e) => e.target.setCustomValidity('Please enter a valid password (at least 8 characters with one lowercase letter, one uppercase letter, and one digit).')}  onInput={(e) => e.target.setCustomValidity('')}   required />
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="cpwd">
              <Form.Label >Confrim Password</Form.Label>
              <Form.Control  type="password" placeholder="Enter Confirm Password"  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$" required />
              {passwordMatch &&( <div style={{ color: 'red' }}>Passwords do not match!</div>)}
            </Form.Group>
      
      
           <center>
            <Button variant="primary" className='Button' type="submit" >
            Submit
            </Button>
            </center>
          </Form>
          </Card.Body>
          </Card>
           </div>);
    }
}