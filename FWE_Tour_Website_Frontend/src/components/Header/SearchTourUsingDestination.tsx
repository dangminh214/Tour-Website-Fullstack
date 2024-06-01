import React, { Dispatch, SetStateAction, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setTours?: Dispatch<SetStateAction<any[]>>;
}

const Header: React.FC<HeaderProps> = ({ setTours }) => {
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

  const handleSubmit = async (event: FormEvent) => {
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
        navigate(`/tours`, {
          state: { foundTours },
        });
      }
    }
  };

  return (
    <div className="headerSearchDestination">
      <h3 className="headerTitle">Looking for tours have this destination</h3>
      <form className="formHeader" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by destination"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className = "searchHeader"
        />
        <button type="submit" className="searchHeader">
          Search
        </button>
      </form>
    </div>
  );
};

export default Header;