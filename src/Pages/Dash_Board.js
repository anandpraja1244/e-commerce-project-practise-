import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';

import { isLoggedIn } from '../auth/helper.auth'
 const Dash_Board=()=> {
 
const dashBoardView=()=>{
  return(
    <div>
      <div> 
     {/* <p> Users  DashBoard</p> */}
     <Outlet/> 
    </div>
    </div>
  )
}

//not logged user 
 const notLoggedIn = () => {
return(
  <Container>
  <Row className="justify-content-md-center  ">
    <Col   md={6}>
    <Card>
 
  <Card.Body className='justify-content-md-center shadow border-0'>
    <Card.Title className='text-center'>You Are Not Login Please Try again</Card.Title>
   
    <Button variant="primary" as={NavLink}   to="/login">Go Login</Button>
  </Card.Body>
</Card>
    </Col>
  </Row>
</Container>
)
  
 
 }

  return (
    <div> 
    {isLoggedIn() ? dashBoardView() : notLoggedIn()}
    </div>
  )
}

export default Dash_Board