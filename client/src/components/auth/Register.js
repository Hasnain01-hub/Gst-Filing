import firebase from "firebase/compat/app";
import animation from "../../assets/login-illustration.gif";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import "./login.css";

const Register = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setuserData] = useState(initialState);
  const nav = useNavigate();

  //   const { user } = useSelector((state) => ({ ...state }));
  var user;
  useEffect(() => {
    user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      nav("/viewfile");
    }
  }, [user, nav]);
  //   let dispatch = useDispatch();

  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:5001/api/auth/register", {
          email: userData.email,
          password: userData.password,
        })
        .then((res) => {
          console.log(res.data);
          window.localStorage.setItem("user", JSON.stringify(res.data));
          setuserData(initialState);
          nav("/dashboard");
        });
    } catch (error) {
      console.log(error);
      toast.error("Account already exists");
    }
  };
  const onChangeHandle = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="card">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Register to GST Filling App</h1>
              <div className="social-container"></div>
              <input
                placeholder="email"
                type="text"
                value={userData.email}
                className="form-control"
                name="email"
                onChange={onChangeHandle}
              />
              <input
                placeholder="password"
                type="text"
                value={userData.password}
                className="form-control"
                name="password"
                onChange={onChangeHandle}
              />
              <button
                style={{ cursor: "pointer" }}
                onClick={signInWithEmailAndPassword}
              >
                Register
              </button>
              <br />
              <span>
                Already have an account
                <Link to="/register"> Login</Link>
              </span>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>

                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div
                className="overlay-panel overlay-right"
                style={{ backgroundColor: "#3A4FAB" }}
              >
                <img
                  style={{
                    width: "100%",
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no - repeat",
                  }}
                  src={animation}
                />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
