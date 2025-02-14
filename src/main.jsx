import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import Customer from './Components/Customer';
import Rentals from './Components/Rentals';
import SingleMovie from './Components/SingleMovie.jsx';
import NotFound from './Components/NotFound.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import MovieForm from './Components/MovieForm.jsx';
import Logout from './Components/logout.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/rentals" element={<Rentals />} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/movie/new" element={<ProtectedRoute element={<MovieForm/>}/>} />
      <Route path='logout' element={<Logout/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
);
