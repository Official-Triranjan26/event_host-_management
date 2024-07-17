import './App.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landingpage from './pages/Landingpage';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminHomepage from './pages/AdminHomepage';
import UserHomepage from './pages/UserHomepage';
import PostAnEvent from './components/adminComponents/PostAnEvent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Landingpage} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/home" Component={UserHomepage} />
        <Route path="/admin" Component={AdminHomepage} >
          <Route path="postevent" element={<PostAnEvent />} />
        </Route>

      </Routes>
      <ToastContainer/>
    </div>
    
  );
}

export default App;
