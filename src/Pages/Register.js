import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { registerUser } from "../services/users.services";
function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    about: "",
  });
  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null,
  });
  const [loading, setLoading] = useState(false);

  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handeSubmited = (e) => {
    e.preventDefault();
   
    if (data.name === undefined || data.name.trim() === "") {
      toast.error("name is requrird");
    }

    if (data.email === undefined || data.email.trim() === "") {
      toast.error("email is requrird");
    }
    if (data.about === undefined || data.about.trim() === "") {
      toast.error("about is requrird");
    }
    if (data.password === undefined || data.password.trim() === "") {
      toast.error("password is requrird");
    }

    if (
      data.confirmPassword === undefined ||
      data.confirmPassword.trim() === ""
    ) {
      toast.error("confirmPassword is requrird");
    }
    if (data.password != data.confirmPassword) {
      toast.error("password and confirmPassword not matched ");
    }
    //All user side complete
    setLoading(true);
    registerUser(data)
   
      .then((userData) => {
        setLoading(false);
        console.log(userData);
        toast.success("register successfully");
        setData({ name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        about: "",})
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error("please correct  register  ||");
        setErrorData({
          isError: true,
          errorData: error,
        });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="text-center">
          <h2>Register Page</h2>
        </div>
        <div className="col-6 ">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter the Name </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                name="name"
                value={data.name}
                onChange={handelChange}
                isInvalid={errorData?.errorData?.response?.data?.name}
              />
              <Form.Control.Feedback type="invalid">
                {errorData?.errorData?.response?.data?.name}{" "}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handelChange}
                isInvalid={errorData?.errorData?.response?.data?.email}
              />
              <Form.Control.Feedback type="invalid">
                {errorData?.errorData?.response?.data?.email}{" "}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Re-Enter-Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handelChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Check
                inline
                name="gender"
                label="male"
                type={`radio`}
                id={`gender`}
                checked={data.gender === "male"}
                value={"male"}
                onChange={handelChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              <Form.Check
                inline
                name="gender"
                label="Female"
                type={`radio`}
                id={`gender`}
                checked={data.gender === "female"}
                value={"female"}
                onChange={handelChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="about"
                value={data.about}
                onChange={handelChange}
                isInvalid={errorData.errorData?.response?.data?.about}
              />
              <Form.Control.Feedback type="invalid">
                {errorData.errorData?.response?.data?.about}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3"></Form.Group>
            <Button variant="primary" type="submit" onClick={handeSubmited}>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                hidden={!loading}
              />
              <span className=" " hidden={!loading}>
                Wait...
              </span>
              <span className=" " hidden={loading}>
                Register
              </span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
