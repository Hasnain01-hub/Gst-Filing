import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layout/Slidebar";
import Nav from "../../layout/Nav";

import { db, storage } from "../../Firebase";
import { useSelector } from "react-redux";

const UploadFile = () => {
  const initialState = {
    url: "",
  };

  const [file, setfile] = React.useState("");
  // const [data, setData] = React.useState(initialState);
  const { user } = useSelector((state) => ({ ...state }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    // const mountainsRef = ref(storage, file.name);
    const storageRef = ref(storage, file.name);

    // const uploadTask = fileRef.put(file);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(uploadProgress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        // Upload completed successfully
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          db.collection("files").add({
            url: downloadURL,
            user: user.user.email,
            created_at: new Date(),
          });
          setfile("");
        });
        // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //   console.log("File available at:", downloadURL);

        // });
      }
    );
  };
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">GST Filing /</span>{" "}
                  Upload File
                </h4>
                <div className="row">
                  <div className="col-xl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            File
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="numbers.xls"
                            value={file.name}
                            disabled
                          />
                          <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            className="form-control"
                            name="url"
                            required
                            onChange={(e) => setfile(e.target.files[0])}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadFile;
