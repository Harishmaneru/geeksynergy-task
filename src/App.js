import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Movies from './movies';  


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Movies" element={<Movies/>} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
    </BrowserRouter>
  );
};
const NotFound = () => {
  return (
    <div className='noroute'>
      <div className='content'>
        <h1>404 Page Not Found</h1>
        <p>
          Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
        </p>
        <p>
          <a href="/"><strong>&lt; Back to our site</strong></a>
        </p>
      </div>
    </div>
  );
};



export default App;
