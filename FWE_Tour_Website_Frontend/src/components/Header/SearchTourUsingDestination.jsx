import React, { useState } from 'react';

export default function SearchTourUsingDestination ({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const findTours = await fetch(`http://localhost:8000/findTourByDestination/${searchQuery}`)
    if (findTours.status === 404) {
      window.location.href = 'http://localhost:3000/tours/tourError '
      return null
    }
    else{
      const foundedTour = await findTours.json()
      const tourName = foundedTour.data.tour.name;
      if (foundedTour) {
        window.location.href = `http://localhost:3000/tours/${tourName}`     //need to change this and create a page that have tours of this destination
      }
    }
  };

  return (
    <div className="headerSearchDestination">
      <h3 className='headerTitle'>Reise suchen mit Reisenziel</h3>
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
    </div>
  );
};