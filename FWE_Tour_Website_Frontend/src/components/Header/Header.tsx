import React from "react";
import TourHeader from "./TourHeader";
import DestinationHeader from "./DestinationHeader";
import SearchTourUsingDestination from "./SearchTourUsingDestination";

interface HeaderProps {
  setTours: (tours: any[]) => void; 
}

const Header: React.FC<HeaderProps> = ({ setTours }) => {
  return (
    <div className="headerComponent">
      <a
        href="http://localhost:3000/tours"
        className="logoHeader"
        aria-label="Reisen"
      ></a>
      <TourHeader />
      <DestinationHeader />
      <SearchTourUsingDestination setTours={setTours} />
      <div className="createNewLinkTour">
        <button
          className="createNewLink"
          onClick={() => (window.location.href = "http://localhost:3000/tours")}
        >
          Alle Reisen
        </button>
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href = "http://localhost:3000/destination")
          }
        >
          Alle Reiseziele
        </button>
      </div>
      <div className="createNewLinkDestination">
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href = "http://localhost:3000/tours/newTour")
          }
        >
          Neue Reise
        </button>
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href =
              "http://localhost:3000/destination/newDestination")
          }
        >
          Neues Reiseziel
        </button>
      </div>
    </div>
  );
};

export default Header;