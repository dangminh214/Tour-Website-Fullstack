import React, { useState, FormEvent } from "react";

const TourHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const findTour = await fetch(`http://localhost:8000/tours/${searchQuery}`);
    if (findTour.status === 404) {
      window.location.href = "http://localhost:3000/tours/tourError";
      return null;
    } else {
      const foundTour = await findTour.json();
      const tourName = foundTour.data.tour.name;
      if (foundTour) {
        window.location.href = `http://localhost:3000/tours/${tourName}`;
      }
    }
  };

  return (
    <div className="headerSearchTour">
      <h3 className="headerTitle">Eine Reise Suchen</h3>
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

export default TourHeader;