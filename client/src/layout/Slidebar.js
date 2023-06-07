import React, { useEffect, useState } from "react";
import $ from "jquery";
import { House, User, Users, X, SimCard } from "phosphor-react";
import { toast } from "react-toastify";
import "../index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const menu = (argument) => {
    $("." + argument).toggleClass("open");
  };
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let userdata = JSON.parse(window.localStorage.getItem("user"));

    if (!userdata) {
      window.location.href = "/";
    }
  }, []);
  const menuToggle = () => {
    $("#layout-menu").removeClass("menu-open");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logout Success", {
      position: toast.POSITION.TOP_CENTER,
      theme: "dark",
    });

    window.location.href = "/";
  };

  return (
    <>
      {console.log(user)}
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav- px-4 py-4 me-xl-4" href="#/">
            <X
              size={22}
              onClick={() => {
                menuToggle();
              }}
            />
          </a>
        </div>
        <div className="app-brand demo">
          <a href="/viewfile" className="app-brand-link">
            <span className="app-brand-text demo text-capitalize menu-text fw-bolder ms-0">
              GST Filing
            </span>
          </a>
          <a
            href="#/"
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="bx bx-chevron-left bx-sm align-middle" />
          </a>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          <li className="menu-item">
            <a href="#/" className="menu-link">
              <User size={22} />
              <div data-i18n="Analytics">
                &nbsp;&nbsp;{user.user && user.user.email}
              </div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#/" className="menu-link">
              <User size={22} />
              <div data-i18n="Analytics" onClick={handleLogout}>
                &nbsp;&nbsp;Logout
              </div>
            </a>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Menu Options</span>
          </li>
          <li className="menu-item">
            <Link to="/uploadfile" className="menu-link">
              <House size={22} className="menu-icon" />
              <div data-i18n="Analytics">Upload XLS File</div>
            </Link>
          </li>

          <li className="menu-item">
            <a href="/viewfile" className="menu-link">
              <SimCard size={22} />
              <div data-i18n="Analytics">&nbsp;&nbsp;View File</div>
            </a>
          </li>
          {/* <li className="menu-item">
            <a href="/joingroup" className="menu-link">
              <SimCard size={22} />
              <div data-i18n="Analytics">&nbsp;&nbsp;Join Groups</div>
            </a>
          </li> */}

          {/* <li className="menu-item">
            <a href="/groupchat" className="menu-link">
              <SimCard size={22} />
              <div data-i18n="Analytics">&nbsp;&nbsp;Group Chats</div>
            </a>
          </li> */}
        </ul>
      </aside>
    </>
  );
};

export default Header;
