import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { HashRouter, Navigate } from "react-router-dom";

import Folder from "./components/Folder";
import { AccountContext } from "./context/accountprovider";
import AddDep from "./pages/AddDep";
import AddUser from "./pages/addUser";

import File from "./pages/File";
import FolderPage from "./pages/FolderPage";
import Home from "./pages/Homepage";
import Login from "./pages/Login";
import OuterFolderPage from "./pages/OuterFolderPage";
import SuperAdmin from "./pages/SuperAdmin";
import { Toaster } from "react-hot-toast";
import SubUserLogin from "./pages/SubUserLogin";
import NotAuth from "./pages/NotAuth";
import AddSubUser from "./pages/AddSubUser";

const App = () => {
  const { admin, user, subUser } = useContext(AccountContext);
  console.log(user);
  return (
    <div>
      <Toaster position="top-center" />;
      <HashRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/file/:ref" element={<File />} />
          <Route
            element={
              admin?.name || user?.name ? (
                <AddSubUser />
              ) : (
                <Navigate to="/notAuth" />
              )
            }
            path="/addSubUser"
          />
          <Route
            path="/addnew"
            element={admin?.name ? <AddUser /> : <Navigate to="/notAuth" />}
          />
          <Route path="/adddepartment" element={<AddDep />} />
          <Route path="/notAuth" element={<NotAuth />} />
          <Route
            path="/:folder"
            element={
              admin?.name || user?.name ? (
                <OuterFolderPage />
              ) : (
                <Navigate to="/notAuth" />
              )
            }
          />
          <Route
            path="/:folder/:dep"
            element={
              subUser?.name || admin?.name || user?.name ? (
                <FolderPage />
              ) : (
                <Navigate to="/subUserLogin" />
              )
            }
          />

          <Route
            path="/login"
            element={
              user ? <Navigate to={`/${user?.department}`} /> : <Login />
            }
          />
          <Route
            path="/subUserLogin"
            element={
              subUser?.name ? (
                <Navigate to={`/${subUser?.department}/${subUser.folder}`} />
              ) : (
                <SubUserLogin />
              )
            }
          />
          <Route
            path="/admin"
            element={admin?.name ? <Navigate to="/" /> : <SuperAdmin />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
