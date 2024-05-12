import React, { useState } from 'react';

export default function Header ({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="headerSearchDestination">
      <h5 className='headerTitle'>Ein Reiseziel Suchen</h5>
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
        <a className="headerLink" href={`http://localhost:8000/destination/`}>Ein neues Reiseziel</a>
      </form>
    </div>
  );
};