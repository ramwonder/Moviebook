import React, { Component } from 'react';
import {Table,Button,ButtonToolbar} from 'react-bootstrap';
import deleteicon from '../image/delete.png'
import Editicon from '../image/clipboard (1).png'
import BookTicket from './Bookticket';
import {BrowserRouter,Route,Routes,useNavigate,Navigate,useHref,Link,useParams} from 'react-router-dom';
import './Table.css';

import Home from '../Home';
class searchbyuser extends Component {
    constructor(props){
        super(props);
        this.state={sups:[],addModelShow:false,editModelShow:false,back:false,updateModelShow:false,Error:'',showTable:true}
    }

    refreshList(){
     
       // const searchQuery = new URLSearchParams(location.search).get('query');
        // this.setState({
        //     sups:[{"Id":1,"Name":"IT"}]
        // })
        // let token=localStorage.getItem('login')
        // if(token)
        // {
            console.log(window.location.href); 
            const url = new URL(window.location.href);
            const pathname = url.pathname; // "/search"
            const searchParams = url.searchParams;
            const query = searchParams.get('query'); 
        fetch('http://localhost:8080/api/v1.0/moviebooking/movies/search/'+query)
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
    handleback= () => {
        this.setState({back:true})
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
        const{sups,movieName,theatreName,Error,showTable,back}=this.state;
        const url = new URL(window.location.href);
            const pathname = url.pathname; // "/search"
            const searchParams = url.searchParams;
            const userid = searchParams.get('id'); 
        if(back)
        {
        
        return <Navigate to={`/user?id=${userid}`} />;
        
        }
        let addModelClose=()=>this.setState({addModelShow:false});
        let editModelClose=()=>this.setState({editModelShow:false});
        let updateModelClose=()=>this.setState({updateModelShow:false});
        return (
            <div>
                <Home/>
                <Button className='Button22' class="rounded-circle" onClick={this.handleback}  >Go back</Button>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                <Table striped bordered hover className='eTable11' >
      <thead>
      <tr>
                        <th>Movie Name</th>
                        <th>Theater Name</th>
                        <th>Ticket Available</th>
                        
                        <th>BOOK</th>
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
                


   
            </tr>
            
            
        )}
        
      </tbody>
    </Table>
 
                
            </div>
        );
    }
}

export default searchbyuser;