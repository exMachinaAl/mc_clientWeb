import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from './components/AuthContext/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import LoginForm from "./components/LoginForm/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Registrasi from "./components/Registrasi/Registrasi";
import Test from "./components/Test/Test";
// import './App.css'


function App() {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/registrasi" element={<Registrasi />} />
        {/* <Route path="/test" Component={Test} /> */}
        <Route exact path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App
