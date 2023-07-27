import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import './Table.css';
import BookTicket from './Bookticket';
import Home from '../Home';
import Editicon from '../image/clipboard (1).png';
import { Navigate } from 'react-router-dom';

class Getmovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sups: [],
      sups1: [],
      addModelShow: false,
      editModelShow: false,
      searchQuery: '',
      updateModelShow: false,
      Error: '',
      movieName: '',
      theatreName: '',
      back: false,
      userid: null,
      noOfTickets:''
    };
  }

  componentDidMount() {
    this.setUserIdFromUrl();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userid !== prevState.userid) {
      // Clear previous data before making a new request
      this.setState({ sups1: [] }, () => {
        this.refreshList();
      });
    }
  }

  setUserIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newUserId = urlParams.get('id');
    if (newUserId) {
      this.setState({ userid: newUserId }, () => {
        this.refreshList();
      });
    }
  }

  refreshList() {
    const { back, searchQuery, userid } = this.state;
    if (back) {
      this.setState({ back: false });
      // Handle search query here
      return;
    }

    if (!userid) {
      // If userid is not available or null, display an error message or redirect to an error page
      this.setState({ Error: 'User ID not found' });
      return;
    }

    // Your fetch requests here...
    // Fetch movies and theaters data
    fetch('http://localhost:8080/api/v1.0/moviebooking/all')
      .then((response) => response.json())
      .then((data) => {
       
        this.setState({
          sups: data,
          
        });
        
       

      })
      .catch((error) => {
        this.setState({
          Error: 'Error fetching data from the server.',
        });
      });

    // Fetch booked movies data based on the userid
    fetch(`http://localhost:8080/api/v1.0/moviebooking/bookedmovies/${userid}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Hi, please book tickets');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          sups1: data,
          Error: '', // Clear any previous error message on success
        });
      })
      .catch((error) => {
        this.setState({
          sups1: [], // Set an empty array or default value to indicate no data found
          Error: error.message, // Use the error message from the caught error
        });
      });
  }

  handleSearch = (event) => {
    event.preventDefault();
    this.setState({ back: true });
  };

  // getStatus = (movie, theatre) => {
  //   const { sups1 } = this.state;
  //   const bookings = sups1.filter(
  //     (booking) => booking.movie.key.movieName === movie && booking.movie.key.theatreName === theatre
  //   );

  //   if (bookings.length > 0) {
  //     const totalTicketsBooked = bookings.reduce((total, booking) => total + booking.noOfTickets, 0);
  //     return totalTicketsBooked + ' Tickets Booked';
  //   } else {
  //     return 'Not Booked';
  //   }
  // };
  getStatus = (movie, theatre) => {
    const { sups1 } = this.state;
    const bookings = sups1.filter(
      (booking) => booking.movie && booking.movie.key && booking.movie.key.movieName === movie && booking.movie.key.theatreName === theatre
    );
  
    if (bookings.length > 0) {
      const totalTicketsBooked = bookings.reduce((total, booking) => total + booking.noOfTickets, 0);
      return totalTicketsBooked + ' Tickets Booked';
    } else {
      return 'Not Booked';
    }
  };
  render() {
    const { sups, searchQuery, Error, movieName, theatreName, sups1, back,noOfTickets } = this.state;

    if (back) {
      // Do something with the search query, for example, update the component state
      return <Navigate to={`/searchmovie?query=${searchQuery}&id=${this.state.userid}`} />;
    }

    if (sups.length === 0) {
      return <div>Loading...</div>; // or show a loading spinner
    }

    return (
      <div>
        <Home />
        <center>
          <form onSubmit={this.handleSearch} id="search1">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => this.setState({ searchQuery: event.target.value })}
              placeholder="Search movie..."
              id="hh"
              required
            />
            <button type="submit" id="hh">
              Search
            </button>
          </form>
        </center>
        <center>
          <br></br>
          <h5 style={{ color: 'green' }}>{Error}</h5>
        </center>
        <br /><br /><br /><br /><br /><br /><br />
        <Table striped bordered hover className='eTable11'>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Theater Name</th>
              <th>Ticket Available</th>
              <th>BOOK</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sups.map((sup) => (
              <tr key={sup.key.movieName}>
                <td>{sup.key.movieName}</td>
                <td>{sup.key.theatreName}</td>
                <td>{sup.totalNoOfTickets}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant='white'
                      id='Butt'
                      onClick={() =>
                        this.setState({ editModelShow: true, movieName: sup.key.movieName, theatreName: sup.key.theatreName ,noOfTickets:sup.totalNoOfTickets})
                      }>
                      <img src={Editicon} />
                    </Button>
                    <BookTicket
                      show={this.state.editModelShow}
                      onHide={() => this.setState({ editModelShow: false })}
                      movieName={movieName}
                      theatreName={theatreName}
                      noOfTickets={noOfTickets}
                    />
                  </ButtonToolbar>
                </td>
                <td>{this.getStatus(sup.key.movieName, sup.key.theatreName)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Getmovie;
