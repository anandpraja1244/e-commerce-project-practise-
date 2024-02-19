import { useContext, useEffect, useState } from "react";
import UserProfileView from "../../Component/users/UserProfileView";
import profileImage from '../../assests/pro.jpg'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import Alert from "react-bootstrap/Alert";
import Image from 'react-bootstrap/Image';
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

import Col from "react-bootstrap/Col";
import { getUser, updateUser } from "../../services/users.services";
//model...
import Modal from "react-bootstrap/Modal";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [updateLoading,setUpdateLoading]=useState(false)

  //model show...
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowModel = () => setShow(true);

  // state for handle image
  const [image, setImage] = useState({
    placeholder: profileImage,
    file: null
})

  useEffect(() => {
    // console.log("data from url userid " + userId)
    // if (userContext.userData) {
    //     getUserDataFromServer()
    // }
    getUserDataFromServer();
  }, []);

  const getUserDataFromServer = () => {
    //api call
    // console.log(userContext)

    getUser(userId)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
        toast.error("Error in loading user information from server !");
      });
  };

  //update modal ...form
  const handelUpdate = (event, property) => {
    setUser({
      ...user,
      [property]: event.target.value,
    });
  };

  const handleUpdateData = () => {
    //update user data by calling api

    console.log("updating user data");
    if (user.name === undefined || user.name.trim() === "") {
      toast.error("user name required !!");
      return;
    }

    // ...  rest of the field

    setUpdateLoading(true)
    updateUser(user)
      .then((updatedUser) => {
        console.log(updatedUser);
        toast.success("User details updated !!");
      })

      .catch((error) => {
        console.log(error);
        toast.error("Image not uploaded !!");
      })
      .finally(() => {
         setUpdateLoading(false)
      });
  };


  const updateViewModal = () => {
    return (
      <>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <div className="md-6">
                <Table responsive="sm" className=" text-center">
                  <tbody>
                  <Container className="justify-content-center m-2"> 
                  <div className="text-center">   
                      <Image src={image.placeholder} width={200} height={200} alt='sdfs'/>
                  </div>
                 
                  </Container>
                      
                  <tr>
                  <td>Profile image Changes </td>
                      <td> 
                     

                      <Form.Control  type="File"   />
                         </td>
                      </tr>
                    <tr>
                      <td>Name</td>

                      <td>
                        <Form.Control
                          type="text"
                          placeholder="enter name"
                          value={user?.name}
                          onChange={(event) => handelUpdate(event, "name")}
                        />
                      </td>
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
                      <td>New password</td>
                      <td>
                        <Form.Control
                          type="password"
                          placeholder="enter new password"
                          value={user.password}
                          onChange={(event) => handelUpdate(event, "password")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>About</td>
                      <td>
                        <Form.Control
                          type="text"
                          as="textarea"
                          placeholder="enter name"
                          value={user.about}
                          onChange={(event) => handelUpdate(event, "about")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Roles</td>
                      <td>
                        {user.roles.map((role) => (
                          <div key={role.roleId}>{role.roleName}</div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateData} 
         
            >
                <Spinner  animation="border" variant="danger"  hidden={!updateLoading}     /> 

              <span hidden={updateLoading} >Save Changes </span> 
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <Container className="mt-3">
        <Row>
          <Col
            md={{
              span: 10,
              offset: 1,
            }}
          >
            {user ? (
              <>
                <UserProfileView
                  user={
                    // {
                    //     name: "Durgesh Kumar Tiwari",
                    //     email: "durgesh@gmail.com",
                    //     gender: 'MALE',
                    //     about: "I am professional react developer.",
                    //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: 'NORMAL' }]
                    // }
                    user
                  }
                  handleShowModal={handleShowModel}
                />

                {updateViewModal()}
              </>
            ) : (
              <Alert>
                <h3 className="text-center text-uppercase m-2">
                  User not loaded from server !
                </h3>
              </Alert>
            )}

            {/* {userContext.userData.user.userId} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
