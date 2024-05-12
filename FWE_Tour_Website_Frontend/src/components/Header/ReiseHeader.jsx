import React, { useState } from 'react';

export default function Header ({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="headerSearchTour">
      <h3 className='headerTitle'>Eine Reise Suchen</h3>
      <form className="formHeader" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Suchen nach Name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          required
          className='searchHeader'
        />
        <button type="submit" className='searchHeader'>Suchen</button>
        <br/>
      </form>
      <a className="headerLink" href={`http://localhost:8000/tours/newTour}`}>Eine neue Reise</a>
    </div>
  );
};