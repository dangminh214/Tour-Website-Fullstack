import React, { useState, useEffect } from "react";

export default function SearchTourUsingDestination({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(
        `http://localhost:8000/tours/findTourByDestination/${searchQuery}`
      );
      const data = await response.json();
      document.title = data.title;
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
    console.log("findTours", findTours);
    if (findTours.status === 404) {
      window.location.href = "http://localhost:3000/tours/tourError ";
      return null;
    } else {
      const foundData = await findTours.json();
      console.log("foundData", foundData);
      const foundTours = foundData.data.tours;
      if (foundTours.length > 0) {
        //window.location.href = `http://localhost:3000/tours/toursWithInputDestination`     //need to change this and create a page that have tours of this destination
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
}
