
import React, { Component } from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
export default class Addclient extends Component{

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
    const data = {
      key: {
        movieName: event.target.movieName.value, 
        theatreName: event.target.theatreName.value
      },
      totalNoOfTickets:  event.target.totalNoOfTickets.value
    };
    const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJyYW1hbiIsImlhdCI6MTY4OTU4NzQyMSwiZXhwIjo2MDgyNTE0NzE4MjI0NDAwfQ.I80O2vmVFNBn3oc6_a4cXNrkEPXBXVqL8MG0r7IRTX4a-eYl62o9mHyitYDG6BMT0hGo7DAA7X-sGjQf7lVoiQ";
    fetch('http://localhost:8080/api/v1.0/moviebooking/add', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            
            'Content-Type': 'application/json'
            
          
        },
        body:JSON.stringify(data),
    }).then(response => response.text())
        .then(data => {this.setState({snackbaropen:true,snackbarmsg:'Movie added Successfully!!!'})})    
        .catch(error => {this.setState({snackbaropen:true,snackbarmsg:'Movie added Failed'})})



 }
    render(){
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
              Add Movie
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form  onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="movieName">
              <Form.Label>Movie Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Movie Name" pattern='[a-zA-Z]+'   required />
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="theatreName">
              <Form.Label>Theater Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Theater Name" pattern='[a-zA-Z]+'  required />
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="totalNoOfTickets">
              <Form.Label>No of Tickets</Form.Label>
              <Form.Control type="number" placeholder="Enter No of Tickets"  required/>
             
            </Form.Group>
           
      
      
           
            <Button variant="primary" data-testid="add-button" className='Button' type="submit">
              Add
            </Button>
          </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className='Button' data-testid="close-button" onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal></div>);
    }
}