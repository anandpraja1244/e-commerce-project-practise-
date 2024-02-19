import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import logo from "../Images/gold.jpg";
import { UseContext } from "../../Context/users.context";
import { useContext } from "react";
// import { isLoggedIn } from "../../auth/helper.auth";
import { NavLink } from "react-router-dom";
function Nave_24() {
  const usecontext = useContext(UseContext);
  console.log("usecontext.===>", usecontext?.islogein);
  const doLogout = () => {
  usecontext?.logout();
  };
  return (
    <>
      <Navbar expand="lg" className="bg-success   ">
        <Container className="">
          <Navbar.Brand href="#home">
            <Image src={logo} alt="jhj" width="auto" height="50px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto  text-light ">
              <Nav.Link className=" text-light " href="/">
                About
              </Nav.Link>
              <Nav.Link className=" text-light " href="/contact">
                Contact
              </Nav.Link>
              <Nav.Link className=" text-light " href="/services">
                Services
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto text-light ">
              <Nav.Link className=" text-light " href="">
                Card (20)
              </Nav.Link>
              {usecontext?.islogein ? (
                <>
                  {usecontext.isAdmin && (  
                    <>
                      <Nav.Link className=" text-light " href="/admin/home">
                        AdminDashBoard
                      </Nav.Link>
                    </>
                  )}
                  <Nav.Link className=" text-light " href= {`/users/profile/${usecontext?.userData?.user?.userId}`}>
                    {usecontext?.userData?.user?.email}
                  </Nav.Link>
                  <Nav.Link className=" text-light " onClick={doLogout}>
                    LogOut
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className=" text-light " href="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link className=" text-light " href="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Nave_24;
