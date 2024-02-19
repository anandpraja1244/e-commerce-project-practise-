import React, { useContext } from 'react'
 import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import profileImage from '../../assests/pro.jpg'
import { BASE_URL } from '../../services/helper.service';
import Image from 'react-bootstrap/Image';
import { UseContext } from '../../Context/users.context';

function UserProfileView({user=null,handleShowModal}) {
  
const  usecontext= useContext(UseContext)

  return (
    <div>
        <div>
      <Container>
        <Row className="justify-content-center ">
        <Container className="my-3 d-flex justify-content-center">
        {/* <Image src={ user.imageName} alt='sdfs'/> */}
        <Image src={user.imageName ? BASE_URL + '/users/image/' + user.userId + '?' + new Date().getTime() : profileImage} alt="Profile Image" 
        className="rounded-circle"
      width={200} height={200}
      />
    </Container>
          <Col xs={6}>
            <div className="md-6">
              <Table responsive="sm" className="shadow text-center" border={1} >
                <tbody >
                  <tr>
                    <td>Name</td>

                    <td>{user.name} </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email} </td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{user.gender} </td>
                  </tr>
                  <tr>
                    <td>About</td>
                    <td>{user.about} </td>
                  </tr>
                  <tr>
                    <td>Roles</td>
                    <td>{user.roles.map(role => <div key={role.roleId}>{role.roleName}</div>)}</td>
                  </tr>
                  <tr  >
                    
                    <td   colSpan={2}>
                    {usecontext.login && usecontext.userData?.user?.userId === user?.userId &&
                    <div className="offset-4  d-flex ">
                  <Button variant="success" onClick={handleShowModal}>Update</Button>
                    <Button className="ms-2" variant="warning">Order</Button>
                  
                    </div>
                      }
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  )
}

export default UserProfileView