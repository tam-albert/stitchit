import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import LoggedOutHome from "./pages/LoggedOutHome";
import Journal from "./pages/Journal";
import MyJournals from "./pages/MyJournals";
import Feed from "./pages/Feed";
import Sidebar from "./modules/Sidebar";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

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

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div>
          <Router>
            {userId ? (
              <Home
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
                path="/"
              />
            ) : (
              <LoggedOutHome
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
                path="/"
              />
            )}
            <Profile path="/profile/:userId" />
            <Journal path="/journal/:journalId" />
            <MyJournals path="/myjournals" />
            <Feed path="/feed" />
            <NotFound default />
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
