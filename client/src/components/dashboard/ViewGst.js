import Header from "../../layout/Slidebar";
import Nav from "../../layout/Nav";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from "react-modal";
import { db, storage } from "../../Firebase";
import { useSelector } from "react-redux";
import React from "react";
import "./helper.css";
import ConvertXLSXtoJson from "./ConvertXLSXtoJson";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    background: "none",
    height: "80%",
    width: "80%",
    bottom: "auto",
    border: "none",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ViewGst = () => {
  const [json, setjson] = React.useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [func, setfunction] = React.useState("");
  const [docx, setdocx] = React.useState({ link: "" });

  async function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    db.collection("files")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    return () => {
      setData([]);
    };
  }, []);
  const handleClick = async (e, item) => {
    e.preventDefault();
    try {
      setdocx({
        link: item.url,
      });
      const data = await ConvertXLSXtoJson(e, item.url);
      setjson(data);
      openModal(item.event);
    } catch (err) {
      console.log("File not found");
    }
  };
  const handlefunc = (e) => {
    e.preventDefault();
    let val = e.target.value;
    if (val.toLowerCase().includes("sum(") && val.includes(")")) {
      var sum = 0;
      let regx = val.split("sum(")[1].split(")")[0];
      let finalval = regx.split(",").map((item) => item.trim());

      let ind = json[0].indexOf(finalval[0]);
      console.log();
      finalval.forEach((it) => {
        if (it) {
          json.slice(1).forEach((item) => {
            if (item[ind]) {
              sum += item[ind];
            }
          });
        }
      });
      setfunction(sum);
      console.log(sum);
    } else if (val.toLowerCase().includes("difference(") && val.includes(")")) {
      var diff = 0;
      let regx = val.split("difference(")[1].split(")")[0];
      let finalval = regx.split(",").map((item) => item.trim());
      let ind = json[0].indexOf(finalval[0]);
      finalval.forEach((it) => {
        if (it) {
          json.slice(1).forEach((item) => {
            if (item[ind]) {
              diff = item[ind] - diff;
            }
          });
        }
      });
      setfunction(diff);
    }
  };
  return (
    <>
      {console.log(json)}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">GST Filing /</span> View
                  File
                </h4>
                <table>
                  <tr>
                    <td>Sr</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>File</td>
                    {user.user && user.user.role == "admin" ? <td></td> : null}
                  </tr>
                  {data.map((item, index) => {
                    return (
                      <tr key={item}>
                        <td>{index + 1}</td>
                        <td>{item.user.split("@")[0]}</td>
                        <td>{item.user}</td>

                        <td>
                          {" "}
                          <p
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => handleClick(e, item)}
                          >
                            &nbsp;View
                          </p>
                        </td>
                        {user.user && user.user.role == "admin" ? (
                          <td></td>
                        ) : null}
                      </tr>
                    );
                  })}
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    ariaHideApp={false}
                    style={customStyles}
                    contentLabel="Register"
                  >
                    <button
                      className="close"
                      style={{
                        outline: "none",
                        border: "none",
                        textAlign: "right",
                      }}
                      onClick={closeModal}
                    >
                      X
                    </button>
                    <h3 style={{ textAlign: "center" }}>File Preview</h3>
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <input
                          placeholder="Search"
                          id="myInput"
                          list="func"
                          onChange={(e) => {
                            handlefunc(e);
                          }}
                          style={{ width: "50%", margin: "0 auto" }}
                          type="text"
                          className="form-control"
                        />
                        <datalist id="func">
                          <option value="Sum(A,B)" />
                          <option value="Difference(A,B)" />
                        </datalist>
                      </div>
                      <div>
                        <p style={{ fontWeight: "bolder" }}>Value: {func}</p>
                      </div>
                    </div>
                    <DocViewer
                      documents={[
                        { uri: docx.link }, // Remote file
                      ]}
                      pluginRenderers={DocViewerRenderers}
                    />

                    {/* </div> */}
                  </Modal>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewGst;
