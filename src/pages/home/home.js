import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= 480 && window.innerWidth <= 1024);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results));

        const handleResize = () => {
            setIsMobile(window.innerWidth < 480);
            setIsTablet(window.innerWidth >= 480 && window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`} key={movie.id}>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title}  />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title : ""}</div>
                                    {(!isMobile && !isTablet) ? (
                                        <div className="posterImage__runtime">
                                            {movie ? movie.release_date : ""}
                                            <span className="posterImage__rating">
                                                {movie ? movie.vote_average : ""}
                                                <i className="fas fa-star" />{" "}
                                            </span>
                                        </div>
                                    ) : null}
                                    {(!isMobile && !isTablet) && (
                                        <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                    )}
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home;
