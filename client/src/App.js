import './App.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landingpage from './pages/Landingpage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminHomepage from './pages/AdminHomepage';
import UserHomepage from './pages/UserHomepage';
import Dashboard from './components/adminComponents/Dashboad'
import PostAnEvent from './components/adminComponents/PostAnEvent';
import ManagaeEvent from './components/adminComponents/ManagaeEvent'
import ManageEventById from './components/adminComponents/ManageEventById'
import EditEventDetails from "./components/adminComponents/EditEventDetails"

import Test from './components/adminComponents/Test';
import TestPage from './pages/TestPage';
import Validate from './components/adminComponents/Validate';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Landingpage} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={UserHomepage} />
        <Route path="/admin" Component={AdminHomepage} >
          <Route path="dashboad" element={<Dashboard />} />
          <Route path="postEvent" element={<PostAnEvent />} />
          <Route path="manageEvent" element={<ManagaeEvent />} />
          <Route path="manageEvent/:id" element={<ManageEventById />} />
          <Route path="manageEvent/edit/:id" element={<EditEventDetails />} />
          <Route path="validate" element={<Validate />} />
          {/* <Route path="test" element={<Test />} /> */}
        </Route>
        <Route path="/test" Component={TestPage }/>

      </Routes>
      <ToastContainer/>
    </div>
    
  );
}

export default App;
