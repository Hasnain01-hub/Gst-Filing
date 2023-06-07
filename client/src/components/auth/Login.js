import animation from "../../assets/login-illustration.gif";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import "./login.css";
import { auth, db } from "../../Firebase";

const Login = () => {
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
    db.collection("users")
      .doc(userData.email)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          try {
            await auth.signInWithEmailAndPassword(
              userData.email,
              userData.password
            );
            // const token = await user.user.getIdToken();
            axios
              .post("http://localhost:5001/api/auth/login", {
                email: userData.email,
                role: doc.data().role,
              })
              .then((res) => {
                console.log(res.data);
                window.localStorage.setItem("user", JSON.stringify(res.data));
                nav("/viewfile");
              });
          } catch (error) {
            console.log(error);
            toast.error("Invalid Email or Password");
          }
        }
      });
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
              <h1>GST Filling Application</h1>
              <div className="social-container"></div>
              <input
                placeholder="email"
                type="text"
                className="form-control"
                name="email"
                onChange={onChangeHandle}
              />
              <input
                placeholder="password"
                type="text"
                className="form-control"
                name="password"
                onChange={onChangeHandle}
              />
              <button
                style={{ cursor: "pointer" }}
                onClick={signInWithEmailAndPassword}
              >
                Login
              </button>
              <br />
              <span>
                Don'nt have an account
                <Link to="/register"> Register</Link>
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
export default Login;
