import React from 'react';
import './Filter.css';

const Filter = ({ setFilter, filterType }) => {
  if (filterType === 'genre') {
    return (
        <div>
        <select className='filter' onChange={(e) => setFilter(e.target.value)}>
          <option>Género</option>
          <option value="">All</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="80">Crimen</option>
          <option value="99">Documentales</option>
          <option value="18">Drama</option>
          <option value="10751">Familia</option>
          <option value="14">Fantasia</option>
          <option value="36">Historia</option>
          <option value="27">Terror</option>
          <option value="10402">Musica</option>
          <option value="9648">Misterio</option>
          <option value="10749">Romance</option>
          <option value="878">Ciencia Ficcion</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">Guerra</option>
          <option value="37">Western</option>
        </select>
      </div>
    );
  } else if (filterType === 'year') {
    const years = [];
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }

    return (
      <div>
        <select className='filter' onChange={(e) => setFilter(e.target.value)}>
          <option>Año</option>
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  } else {
    return null;
  }
};

export default Filter;
