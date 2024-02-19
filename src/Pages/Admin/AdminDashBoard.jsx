import React, { useContext } from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { UseContext } from '../../Context/users.context'
import { isAdminUser } from '../../auth/helper.auth'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SidebarMenu from '../../Component/admin/SidebarMenu';
function AdminDashBoard() {

  const  usecontext=useContext(UseContext)

    const AdminDashBoardView =()=>{
        return(
            <> 
            <Container className=' '>  
            <Row className='d-flex'> 
            <Col md={2}>
            <SidebarMenu/> 
            </Col>
            <Col md={8}>   <Outlet/> </Col>
              </Row> 
            </Container>
          
            </>
        )
    }

  return (
    <div>
    {isAdminUser() ? AdminDashBoardView() :  <Navigate to="/login" />  }
    </div>
  )
}

export default AdminDashBoard