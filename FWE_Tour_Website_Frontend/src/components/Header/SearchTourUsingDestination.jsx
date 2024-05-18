import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchTourUsingDestination = ({ setTours }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(
        `http://localhost:8000/tours/findTourByDestination/${searchQuery}`
      );
      const data = await response.json();
      if (data.title) {
        document.title = data.title;
      }
    };
    if (searchQuery) {
      fetchTitle();
    }
  }, [searchQuery]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const findTours = await fetch(
      `http://localhost:8000/tours/findTourByDestination/${searchQuery}`
    );
    if (findTours.status === 404) {
      window.location.href = "http://localhost:3000/tours/tourError ";
      return null;
    } else {
      const foundData = await findTours.json();
      const foundTours = foundData.data.tours;
      if (setTours) {
        setTours(foundTours);
      }
      if (foundTours.length > 0) {
        console.log("Search Tours using destination foundTours: ", foundTours);
        navigate("/tours", { state: { foundTours } });
        setTours(foundTours);
      }
    }
  };

  return (
    <div className="headerSearchDestination">
      <h3 className="headerTitle">Reise suchen mit Reisenziel</h3>
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
        <br />
      </form>
    </div>
  );
};

export default SearchTourUsingDestination;
