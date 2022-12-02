import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { HashRouter, Navigate } from "react-router-dom";

import Folder from "./components/Folder";
import { AccountContext } from "./context/accountprovider";
import AddDep from "./pages/AddDep";
import AddUser from "./pages/addUser";
import Admin from "./pages/Admin";
import File from "./pages/File";
import FolderPage from "./pages/FolderPage";
import Home from "./pages/Homepage";
import Login from "./pages/Login";
import OuterFolderPage from "./pages/OuterFolderPage";

const App = () => {
  const { admin, user } = useContext(AccountContext);
  console.log(user);
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/file/:ref" element={<File />} />
          <Route path="/addnew" element={<AddUser />} />
          <Route path="/adddepartment" element={<AddDep />} />
          <Route path="/:folder" element={<OuterFolderPage />} />
          <Route path="/:folder/:dep" element={<FolderPage />} />

          <Route
            path="/login"
            element={
              user ? <Navigate to={`/${user?.department}`} /> : <Login />
            }
          />
          <Route
            path="/admin"
            element={admin ? <Navigate to="/" /> : <Admin />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
