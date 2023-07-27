import {Table,Button,ButtonToolbar} from 'react-bootstrap';


import { Component } from 'react';
import './Table.css';
import AddMovie from './AddMovie';
import BookTicket from './Bookticket';
import addicon from '../image/follower.png'
import deleteicon from '../image/delete.png'
import Editicon from '../image/clipboard (1).png'
import Search from './search';
// import UpdateFeedback from './UpdateFeedback';
import Home from './dash';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams,withRouter} from 'react-router-dom';

class Getmovie1 extends Component {
    constructor(props){
        super(props);
        this.state={sups:[],addModelShow:false,editModelShow:false,back:false,updateModelShow:false,searchQuery:'',Error:'',showTable:true}
    }
   
    refreshList(){
        // this.setState({
        //     sups:[{"Id":1,"Name":"IT"}]
        // })
        // let token=localStorage.getItem('login')
        // if(token)
        // {
        fetch('http://localhost:8080/api/v1.0/moviebooking/all')
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                sups:data
            });
        }
            
            );
      // }
      // else{
      //   this.state.Error='404 Error'
        
      // }
    }
    componentDidMount()
    {
        this.refreshList();
    }
    componentDidUpdate()
    {
        this.refreshList();
    } 
    deletedep(movieName,theatreName)
    {
       if(window.confirm('are you sure?'))
       {
       
        fetch(`http://localhost:8080/api/v1.0/moviebooking/${movieName}/${theatreName}/delete`, {
               method: 'DELETE',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               }
        });
       } }
    render() {
        const{sups,movieName,theatreName,searchQuery,Error,showTable,back}=this.state;
        const url = new URL(window.location.href);
        const pathname = url.pathname; // "/search"
        const searchParams = url.searchParams;

        const userid = searchParams.get('id')
        if(back)
        {
          const { searchQuery } = this.state;
          <Search
          searchQuery={searchQuery}
          />
        return <Navigate to={`/search?query=${searchQuery}&id=${userid}`} />;
      
  
        };
        let addModelClose=()=>this.setState({addModelShow:false});
        let editModelClose=()=>this.setState({editModelShow:false});
        let updateModelClose=()=>this.setState({updateModelShow:false});
      return (   
        <div>
         <Home/>
         <form onSubmit={this.handleSearch} id="search">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => this.setState({ searchQuery: event.target.value })}
            placeholder="Search movie..."
            id="hh"
           required 
          />
          <button   onClick={()=>this.setState({back:true})} type="submit" id="hh">Search</button>
         
        </form>
         <center>
           <h1 style={{color:"red"}}>{Error}</h1>
           </center>
           <ButtonToolbar>
        <Button variant='danger' className='buttupdate' id='Butt' onClick={()=>this.setState({addModelShow:true})}><img src={addicon}/>Add Movie</Button>
    <AddMovie
    show={this.state.addModelShow}
    onHide={addModelClose}
   />
  
    </ButtonToolbar>
  <Table striped bordered hover className='eTable11' >
      <thead>
      <tr>
                        <th>Movie Name</th>
                        <th>Theater Name</th>
                        <th>Ticket Available</th>
                        
                        <th>View Booked Details</th>
                        <th>Delete movie</th>
        </tr>
      </thead>
      <tbody>
        {sups.map(sup=>
            <tr key={sup.key.movieName}>
                <td>{sup.key.movieName}</td>
                <td>{sup.key.theatreName}</td>
                 <td>{sup.totalNoOfTickets}</td>
                 <td>

        <ButtonToolbar>
       
       <Button className="mr-2" variant='white'  id='Butt' onClick={()=>this.setState({editModelShow:true,movieName:sup.key.movieName,theatreName:sup.key.theatreName})}><img src={Editicon}/></Button>
      
       <BookTicket  show={this.state.editModelShow}  onHide={editModelClose}
      
      movieName={movieName}
      theatreName={theatreName}
      />
    </ButtonToolbar>
                 </td>
                
    <td><ButtonToolbar>
       
       <Button variant='white' id='Butt' className='delete' onClick={()=>this.deletedep(sup.key.movieName,sup.key.theatreName)}><img src={deleteicon}/></Button>
          
          {/* <UpdateFeedback  show={this.state.updateModelShow}  onHide={updateModelClose}
          id={id}
        
          feedback={feedback}/> */}
    </ButtonToolbar></td>

   
            </tr>
            
            
        )}
        
      </tbody>
    </Table>
 
    </div>
  );

    }
  }
  export default Getmovie1;