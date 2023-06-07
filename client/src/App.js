import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/dashboard/Home";
import { loginSuccess } from "./reducers";
import { useDispatch } from "react-redux";
import axios from "axios";
import UploadFile from "./components/UploadFile.js/UploadFile";
import ViewGst from "./components/dashboard/ViewGst";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // const token = Cookies.get("jwt");
    const token = JSON.parse(window.localStorage.getItem("user"));
    if (token) {
      getcurrentuser(token)
        .then((res) => {
          console.log(res);
          dispatch(
            loginSuccess({
              email: res.data._fieldsProto.email.stringValue,
              role: res.data._fieldsProto.role.stringValue,
            })
          );
        })
        .catch();
    }
  }, [dispatch]);

  const getcurrentuser = async (token) => {
    if (token) {
      return await axios.get("http://localhost:5001/api/auth/current_user", {
        headers: {
          authtoken: token,
        },
      });
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Home />} /> */}
        <Route path="/uploadfile" element={<UploadFile />} />
        <Route path="/viewfile" element={<ViewGst />} />
      </Routes>
    </div>
  );
}

export default App;
