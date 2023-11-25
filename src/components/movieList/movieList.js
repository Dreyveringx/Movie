import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Filter from "../filter/Filter";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES`)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(error => console.error("Error fetching movies:", error));
    };

    const delayedSearch = (value) => {
        // Simular retraso de 500ms antes de realizar la búsqueda
        setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${value}`)
                .then(res => res.json())
                .then(data => setMovieList(data.results))
                .catch(error => console.error("Error fetching search results:", error));
        }, 500); // Tiempo de espera de 500ms
    };

    const handleSearchOnChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        delayedSearch(value);
    };


    const handleGenreFilter = (selectedGenre) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_genres=${selectedGenre}`)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(error => console.error("Error fetching movies by genre:", error));
    
        console.log("Filtrar por Género:", selectedGenre);
    };

    const handleYearFilter = (selectedYear) => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&primary_release_year=${selectedYear}`)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(error => console.error("Error fetching movies by year:", error));
    
        console.log("Filtrar por Año:", selectedYear);
    };



    return (
        <div className="movie__list">
            
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="search__container">
                <div className="filter__buttons">
                    <Filter setFilter={handleGenreFilter} filterType="genre" />
                </div>
                <input className="search"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchOnChange}
                    placeholder="Buscar películas..."
                />
                <div className="filter__buttons">
                    <Filter setFilter={handleYearFilter} filterType="year" />
                </div>
            </div>
            <div className="list__cards">
                {movieList.map(movie => (
                    <Cards movie={movie} key={movie.id} />
                ))}
            </div>
        </div>

    );
};

export default MovieList;
