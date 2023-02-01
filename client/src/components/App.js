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
import Drafts from "./pages/Drafts";

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
    document.title = "StitchIt";
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

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    post("/api/login", { token: userToken }).then((user) => {
      // the server knows we're logged in now
      setUserId(user._id);
      setUserName(decodedCredential.name.split(" ")[0]);
    });
  };

  const handleLogout = () => {
    setUserId(null);
    setUserName(null);
    post("/api/logout");
  };

  return (
    <>
      {userId ? (
        <div className="flex">
          <Sidebar userId={userId} userName={userName} handleLogout={handleLogout} />
          <div className="w-full">
            <Router className="h-full">
              <Home
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
                path="/"
              />
              <Prompts path="/prompts" />
              <Profile path="/profile/:profileId" userId={userId} bio={userBio} />
              <Journal path="/journal/:journalId" userId={userId} />
              <MyJournals path="/myjournals" userId={userId} />
              <Drafts path="/drafts" userId={userId} />
              <Feed path="/feed" userId={userId} />
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
