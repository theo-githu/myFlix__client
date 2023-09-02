import React from "react";
import { PropTypes } from "prop-types";
import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    console.log("movie from movie-card", movie)
    return (
        <Card className="h-100" style={{ border: "none" }}>
            <Card.Img variant="top" src={movie.ImageURL} />
            <Card.Body className="h-100 d-flex flex-column">
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}  className="mt-auto">
                    <Button variant="primary">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Rating: PropTypes.string.isRequired,
    }).isRequired
};
