import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { loginUser } from "../services/users.services";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../Context/users.context";

function Login() {
  const usecontext = useContext(UseContext);

  const redirect = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    isError: false,
    errorData: null,
  });
  const handelChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handeSubmited = (e) => {
    e.preventDefault();
    console.log("data", data);
    if (data.email === undefined || data.email.trim() === "") {
      toast.error("email is requrird");
    }

    if (data.password === undefined || data.password.trim() === "") {
      toast.error("password is requrird");
    }
    //all right...........................
    loginUser(data)
      .then((data) => {
        console.log(data);
        toast.success("login successfully");

        setError({
          isError: false,
          errorData: null,
        });

        // usecontext.setUserData(data);  //data send backend data
        // usecontext.setIsLogein(true);
        // ------------------------------------------------
        usecontext.login(data); //data send backend data
       console.log('data===>new', data)
        //redirect page /users/home
        redirect("/users/homenew");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message);
        setError({
          isError: true,
          errorData: error,
        });
      });
  };
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="text-center">
          <h2>Login Page</h2>
        </div>
        <div className="col-6 ">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handelChange}
              />
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

            <Form.Group className="mb-3"></Form.Group>
            <Button variant="primary" type="submit" onClick={handeSubmited}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
