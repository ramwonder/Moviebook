
import React, { Component } from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MovieSeatBooking from './Movieseatbook';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams} from 'react-router-dom';
export default class Bookticket extends Component{

 constructor(props){
    super(props);
    this.state={snackbaropen:false,snackbarmsg:'',movieName:'',theatreName:''}
    this.handleSubmit=this.handleSubmit.bind(this);
 }
 snackbarclose=(event)=>{
    this.setState({snackbaropen:false});
 }


 handleSubmit(event){
    event.preventDefault();
    this.setState({movieName:event.target.moviename.value,theatreName:event.target.theatreName.value,back:true});
    console.log(this.state.movieName,this.state.theatreName);
   



 }
    render(){
      const{movieName,theatreName,back}=this.state;
  if(back)
  {
    console.log(window.location.href); 
    const url = new URL(window.location.href);
    const pathname = url.pathname; // "/search"
    const searchParams = url.searchParams;
    const username = searchParams.get('id'); 
  
  return <Navigate to={`/movieseat?moviename=${movieName}&theatreName=${theatreName}&id=${username}&tickets=${this.props.noOfTickets}`} />;;
  
  }
      const availableTickets = 30;
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

<Modal 
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Book Movie
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="moviename">
              <Form.Label>moviename</Form.Label>
              <Form.Control type="text" placeholder="Enter moviename" disabled defaultValue={this.props.movieName}/>
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="theatreName">
              <Form.Label>theatreName</Form.Label>
              <Form.Control type="text" placeholder="Enter theatreName" pattern='[a-zA-Z]+' disabled  required  defaultValue={this.props.theatreName}/>
             
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="noOfTickets">
              <Form.Label>noOfTickets</Form.Label>
              <Form.Control type="email" placeholder="Enter noOfTickets"required  />
             
            </Form.Group> */}
            <Form.Group>
            
            </Form.Group>
           
      
            <Button variant="primary" className='Button' type="submit">
              Next
            </Button>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className='Button' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal></div>);
    }
}