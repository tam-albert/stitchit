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
import Prompts from "./pages/Prompts";
import LoggedOutNotFound from "./pages/LoggedOutNotFound";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [name, setName] = useState(null);
  const [userBio, setUserBio] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name.split(" ")[0]);
        setName(user.name);
        setUserBio(user.bio);
      }
    });
  }, []);

  useEffect(() => {
    document.title = "StitchIt";
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
      setUserName(decodedCredential.name.split(" ")[0]);
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    setUserName(null);
    post("/api/logout");
  };

  return (
    <>
      {userId ? (
        <div className="flex">
          <Sidebar userId={userId} userName={userName} handleLogout={handleLogout} />
          <div className="p-12 w-full">
            <Router className="h-full">
              <Home
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
                path="/"
              />
              <Prompts path="/prompts" />
              <Profile path="/profile/:userId" userId={userId} name={name} bio={userBio} />
              <Journal path="/journal/:journalId" userId={userId} />
              <MyJournals path="/myjournals" />
              <Feed path="/feed" />
              <NotFound default />
            </Router>
          </div>
        </div>
      ) : (
        <Router>
          <LoggedOutHome
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
            path="/"
          />
          <LoggedOutNotFound default />
        </Router>
      )}
    </>
  );
};

export default App;
