import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
        
    if(!token) 
    return;
    
    fetch("https://movieapp-1234-d69a5eea9685.herokuapp.com/movies", {
        headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("movies from API:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL,
            description: movie.Description,
            genre: movie.Genre.Name,
            director: movie.Director.Name,
            rating: movie.Rating
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);


  if (!user) {
    return (
      <Row className="justify-content-md-center">
        {!user ? (
          <>
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
              or
              <SignupView />
            </Col>
          </>
        ) : selectedMovie ? (
          <Col>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length ===0 ? (
          <div>The list is empty!</div>
        ): (
          <>
            {movies.map((movie) => (
              <Col className="mb-5" key={movie.id} md={3}>
                  <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    selectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    );
  };
}
