import React, { useState, FormEvent } from "react";

const DestinationHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const findDestination = await fetch(`http://localhost:8000/destination/${searchQuery}`);
    if (findDestination.status === 404) {
      window.location.href = "http://localhost:3000/destination/destinationError";
      return null;
    } else {
      const foundDestination = await findDestination.json();
      const destinationName = foundDestination.data.destination.name;
      if (foundDestination) {
        window.location.href = `http://localhost:3000/destination/${destinationName}`;
      }
    }
  };

  return (
    <div className="headerSearchDestination">
      <h3 className="headerTitle">Ein Reiseziel Suchen</h3>
      <form className="formHeader" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Suchen nach Name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          required
          className="searchHeader"
        />
        <button type="submit" className="searchHeader">
          Suchen
        </button>
      </form>
    </div>
  );
};

export default DestinationHeader;