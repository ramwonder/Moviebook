import React, { Component } from 'react';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams} from 'react-router-dom';
import {Button,Card} from 'react-bootstrap';
import Home from '../Home'
class MovieSeatPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSeats: [],
      sups:[],
      bookedSeats: [],
      movieName:'',
      theatreName:'',
      userid:'',
      totalTicket:0,
      redirect:false,
      back:false,
      tick:'',
      noOfTickets:0
    };
  }
  refreshList() {
    // Fetch the booked tickets data for the specified movieName and theatreName
    console.log(window.location.href); 
    const url = new URL(window.location.href);
    const pathname = url.pathname; // "/search"
    const searchParams = url.searchParams;
    const movieName = searchParams.get('moviename'); 
    const theatreName = searchParams.get('theatreName'); 
    const userid = searchParams.get('id'); 
    const tick=searchParams.get('tickets'); 
   this.setState({movieName:movieName,theatreName:theatreName,userid:userid,tick:tick})
    fetch(
      `http://localhost:8080/api/v1.0/moviebooking/bookedmovies2/${movieName}/${theatreName}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          sups: data,
          showTicketsLabel: true,

        },
        () => {
          // Update bookedSeats state inside the setState callback to avoid unnecessary re-renders
          const { sups } = this.state;
          const bookedSeats = sups.flatMap((booking) => booking.seatNumber);
         // const bookedSeats = sups.length > 0 ? sups.flatMap((booking) => booking.seatNumber) : [];
          const noOfTickets = sups[0].movie.totalNoOfTickets;
          //const noOfTickets = sups[0]?.movie?.totalNoOfTickets ?? 0;
          this.setState({ bookedSeats,noOfTickets });
        }
        );
      })
      .catch((error) => console.error(error));
  }
  componentDidMount()
      {
          this.refreshList();
      }
      componentDidUpdate(prevProps) {
        const { moviename, theatreName } = this.props;
        if (moviename !== prevProps.moviename || theatreName !== prevProps.theatreName) {
          this.refreshList();
        }
        
      }

      handleback= () => {
        this.setState({back:true})
      }
      handleClick = () => {
        
        const { selectedSeats} = this.state;
       console.log(selectedSeats);
        // You can perform any actions you want here
        // For example, you can pass data or trigger other functions.
        if(selectedSeats.length > 0)
        {
        const data ={
          "movie": {
            "key": {
              "movieName": this.state.movieName,
              "theatreName": this.state.theatreName
            },
            "totalNoOfTickets": 0
          },
          "noOfTickets": selectedSeats.length,
          "seatNumber": selectedSeats,
          "userid": this.state.userid
        };
        console.log('Button clicked!', data);
        
        fetch('http://localhost:8080/api/v1.0/moviebooking/book', {
          method: 'POST',
          headers: {
              'accept': '*/*',
              
              'Content-Type': 'application/json'
              
            
          },
          body:JSON.stringify(data),
      }).then(response => response.text())
          .then(data => {alert("booked")},this.setState({redirect:true}))    
          .catch(error => {{alert("Failed")}})
    }
    else{
      alert("please select seats");
    }
      }
  toggleSeat = (seatLabel) => {
    this.setState((prevState) => ({
      selectedSeats: prevState.selectedSeats.includes(seatLabel)
        ? prevState.selectedSeats.filter((seat) => seat !== seatLabel)
        : [...prevState.selectedSeats, seatLabel],
    }));
  };

  getAlphabetLabel = (index) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[index];
  };
 


  render() {
    const {  className } = this.props;
    const availableTickets=30;
    const { selectedSeats,sups,bookedSeats,redirect,back} = this.state;
   
  if(redirect)
  {
  
  return <Navigate to={`/user?id=${this.state.userid}`} />;
  
  }
  if(back)
  {
  
  return <Navigate to={`/user?id=${this.state.userid}`} />;
  
  }

    // // Update the state with the booked seat numbers
    // this.setState({ bookedSeats });
    const preBookedSeats = [...bookedSeats]; // Sample pre-booked seats

    const totalSeats = availableTickets + preBookedSeats.length;
    const availableSeats = availableTickets - selectedSeats.length;
    const totalTicket = selectedSeats.length;
    const bb=this.state.tick ;
    if (bb==='0') {
      return (
        <div>
          <Home />
          <br></br>
          <center>
          <Button className='Button' class="rounded-circle" onClick={this.handleback}  >Go back</Button>
          <h3>Sorry, this movie is currently sold out. Please select another movie.</h3>
          </center>
        </div>
      );
    }
    
    return (
      <div className={className}>
        <Home/>
       
        
        
        <Card border="danger" className='movieseat' style={{ width: '18rem' }}>
        <Button className='Button21'  onClick={this.handleback}  >Go back</Button>
        <Card.Body>

        <Card.Title>Movie Seat Picker</Card.Title>
        
        <div   style={{ display: 'flex', flexDirection: 'column' }}>
          {Array.from({ length: Math.ceil(availableTickets / 8) }, (_, row) => (
            <div key={row} style={{ display: 'flex' }}>
              {Array.from({ length: Math.min(availableTickets - row * 8, 8) }, (_, col) => {
                const seatLabel = `${this.getAlphabetLabel(row)}${col + 1}`;
                const isSeatSelected = selectedSeats.includes(seatLabel);
                const isSeatBooked = preBookedSeats.includes(seatLabel);

                return (
                  <div
                   className='ra'
                    key={col}
                    style={{
                     
                      width: 30,
                      height: 30,
                      border: '1px solid #ccc',
                      margin: 5,
                      
                     
                      backgroundColor: isSeatSelected
                        ? 'green'
                        : isSeatBooked
                        ? 'red'
                        : 'white',
                      cursor: isSeatBooked ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => !isSeatBooked && this.toggleSeat(seatLabel)}
                  >
                    {seatLabel}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
        <p>Total Tickets Selected: {totalTicket}</p>
        <p>Total Tickets available: {this.state.tick}</p>
       
        </Card.Body>
        <Button className='Button'onClick={this.handleClick} >Book Ticket</Button>
        </Card>
      </div>
    );
  }
}

export default MovieSeatPicker;
