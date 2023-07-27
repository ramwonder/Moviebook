
import {Form,Button,Card,Col,Row,Nav} from 'react-bootstrap';
import './form.css';
import Home1 from './Home1';
import require from './image/login (1).png';
import React, { SyntheticEvent,useRef,useState} from 'react';
import {BrowserRouter,Route,Routes,useNavigate,Navigate} from 'react-router-dom';
import svg from './image/wave.png';

function GridExample() {
  // const navigate=useNavigate();
  // const NavigateDashboard=()=>
  // {
  //   navigate('/Home');
    

  // };
  const [UserName,setUserName]=useState('');
  const [Password,setPassword]=useState('');
  const [Redirect,setRedirect]=useState(false);
  const login=useRef(false);

const submit = async(e)=>{
  e.preventDefault();
  fetch(`http://localhost:8080/api/v1.0/moviebooking/login/${UserName}/${Password}`).then(response => {
    console.log(JSON.stringify(response));
    return response.json();
  }).then(data => {
    // Work with JSON data here
    console.log(data);
    console.log(data.token);
          if(data.token)
          {
          login.current=true;
          console.log(login.current);
          setRedirect(true)
        
          }
          else{
            alert('username && password incorrect');
            e.target.reset();
          }
          localStorage.setItem('login',data.token)

  }).catch(err => {
    // Do something for an error here
    console.log("Error Reading data " + err);
  });
  // await fetch('http://localhost:8080/api/v1.0/moviebooking/login/mano23/ram',{
      
  //     method: 'GET',
  //     headers: {'accept': '*/*','Content-Type':'application/json',
  //             },
      
   
  //     // body:JSON.stringify(
  //     //     {
  //     //         UserName,
  //     //         Password

  //     //     })
  // }).then((response)=>{
  //   console.log(response);
      // response.json().then((result)=>{
      //     console.log(result);
      //     if(result.token)
      //     {
      //     login.current=true;
      //     console.log(login.current);
      //     setRedirect(true)
        
      //     }
      //     else{
      //       alert('username && password incorrect');
      //       e.target.reset();
      //     }
      //     localStorage.setItem('login',result.token)

              
        
  //     })
  // });



 
}
if(UserName==="Admin")
{
  if(Redirect)
  {
  
  return <Navigate to={`/admin?id=${UserName}`} />;;
  
  }
}
else
{
  if(Redirect)
{

return <Navigate to={`/user?id=${UserName}`} />;;

}
}

console.log(Redirect);
  return (<div>
    <Home1/>
    <Card border="dark" class="row" style={{ width: '28rem' }} className='card1'>
    <Card.Header><center> <img src={require} class="img-rounded" alt="Cinque Terre" width="150" height="150" /></center></Card.Header>
    <Card.Body>
    
        
       
        <Form className='login' onSubmit={submit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>UserName</Form.Label>
        <Form.Control type="text" placeholder="Enter UserName" onChange={e=>setUserName(e.target.value)} required />
   
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" onChange={e=>setPassword(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Nav.Item>
        <Nav.Link href="/forget">Forget password ?</Nav.Link>
      </Nav.Item>
      <center>
      <Button variant="danger" className='Button' type="submit">
        Login
      </Button>
      </center>
    </Form>

    </Card.Body>
  </Card>
  <img
           
            src={svg}
            alt="First slide"
            className='img2'
            width={1510}
         
          />
  </div>
  );
}

export default GridExample;
