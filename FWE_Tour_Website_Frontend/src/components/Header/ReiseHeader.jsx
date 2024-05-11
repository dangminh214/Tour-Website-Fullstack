import React, { useState, useEffect } from 'react';

// Header component
export default function Header ({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="headerSeachTour">
      <h5>Eine Reise Suchen</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Suchen nach Name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          required
        />
        <button type="submit">Suchen</button>
        <br/>
      </form>
      <a href={`http://localhost:8000/tours/newTour}`}>Eine neue Reise</a>
    </div>
  );
};