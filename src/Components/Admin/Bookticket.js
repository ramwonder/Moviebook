
import React, { Component } from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export default class Bookticket extends Component{

 constructor(props){
    super(props);
    this.state={snackbaropen:false,snackbarmsg:''}
    this.handleSubmit=this.handleSubmit.bind(this);
 }
 snackbarclose=(event)=>{
    this.setState({snackbaropen:false});
 }
 handleSubmit(event){
    event.preventDefault();
    let token=localStorage.getItem('login')
    fetch('http://localhost:8080/api/v1.0/moviebooking/bookedmovies/'+event.target.moviename.value+'/'+event.target.theatreName.value)
    .then(response=>response.json())
    .then(data=>{
        this.setState({
            sups:data,
            showTicketsLabel: true
        });
    }
        
        );


 }
    render(){
      const{sups,showTicketsLabel}=this.state;
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
              View Movie Tickets Booked Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="moviename">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" placeholder="Enter moviename" disabled defaultValue={this.props.movieName}/>
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="theatreName">
              <Form.Label>Theatre Name</Form.Label>
              <Form.Control type="text" placeholder="Enter theatreName" pattern='[a-zA-Z]+' disabled required  defaultValue={this.props.theatreName}/>
             
            </Form.Group>
            
           
      
            <Button variant="primary" className='Button' type="submit">
              View book Ticket details
            </Button><br/><br></br>
            {showTicketsLabel && (
        <div>
          <label>No of tickets booked for this movie: {sups}</label>
        </div>
      )}
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className='Button' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal></div>);
    }
}