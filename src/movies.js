import React, { useEffect, useState } from 'react';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
const Movie = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false); 
  

  useEffect(() => {
    // Make the API request when the component mounts
    fetch('https://hoblist.com/api/movieList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: 'movies',
        language: 'kannada',
        genre: 'all',
        sort: 'voting',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data.result);
        console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('API request error:', error);
        setLoading(false);
      });
  }, []);
  const companyInfo = (
    <div className="company-info">

      <p>Company: Geeksynergy Technologies Pvt Ltd</p>
      <p>Address: Sanjayanagar, Bengaluru-56</p>
      <p>Phone: XXXXXXXXX09</p>
      <p>Email: XXXXXX@gmail.com</p>
    </div>
  );

  return (

          <div className="movies-container">
      <nav className="navbar">
        <div className="navbar-left">
          <p>Geeksynergy Technologies</p>
        </div>
        <div className="navbar-right">
          <button onClick={() => setShowCompanyInfo(!showCompanyInfo)}>
            Company Info
          </button>
        </div>
      </nav>
      {showCompanyInfo ? companyInfo : null}
  
      {loading ? (
        <p>Loading...</p>
      ) : (
       
        <ul className="movie-items">
        {movieData.map((movie, index) => (
          <li key={index} className="movie-item">
            <div className="left-section">
             
              <div className="vote-count">
                  <BiSolidUpArrow  size={40} color="gray" className="vote-icon" />
                  <div className="vote-value">{movie.voting}</div>
                  <BiSolidDownArrow  size={40} color="gray" className="vote-icon" />
         
              </div>
              <div className="center-section">
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
              </div>
            </div>
            <div className="right-section">
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-info">
                <span className="info-label">Genre:</span> {movie.genre}
              </p>
              <p className="movie-info">
                <span className="info-label">Director:</span> {movie.director.join(', ')}
              </p>
              <p className="movie-info">
                <span className="info-label">Stars:</span> {movie.stars.join(', ')}
              </p>
              <p className="movie-info">
                <span className="info-label">Runtime:</span> {movie.runTime} Mins
              </p>
              <p className="movie-info">
                <span className="info-label">Language:</span> {movie.language}
              </p>
              <p className="movie-info">
                <span className="info-label">Released:</span>{' '}
                {new Date(movie.releasedDate * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <button className="watch-trailer-button">Watch Trailer</button>
            </div>
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default Movie;
