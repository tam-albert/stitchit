import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import NavBar from "./modules/NavBar.js";
import Home from "./pages/home.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

import { gapi } from "gapi-script";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log("handleLogin called");
    const userToken = res.tokenObj.id_token;
    console.log(res);
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      console.log("wtf help");
      setUserId(user._id);
      console.log(user);
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <div className="App-container">
        <Router>
          <Home path="/" />
          <Profile path="/profile/" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
