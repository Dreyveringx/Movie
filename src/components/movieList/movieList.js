import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import Filter from "../filter/Filter";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página
    const { type } = useParams();

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=es-ES&page=${currentPage}`)
            .then(res => res.json())
            .then(data => {
                // Combina los resultados de la nueva página con la lista existente
                setMovieList(prevList => [...prevList, ...data.results]);
            })
            .catch(error => console.error("Error fetching movies:", error));
    };

    useEffect(() => {
        setMovieList([]); // Limpia la lista para cargar nuevos datos
        setCurrentPage(1); // Reinicia la página a 1 al cambiar el tipo
    }, [type]);

    useEffect(() => {
        getData();
    }, [type, currentPage]);

    const delayedSearch = (value) => {
        setTimeout(() => {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${value}`)
                .then(res => res.json())
                .then(data => setMovieList(data.results))
                .catch(error => console.error("Error fetching search results:", error));
        }, 500);
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
                <button  onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Cargar Más</button>
        </div>
    );
};

export default MovieList;
