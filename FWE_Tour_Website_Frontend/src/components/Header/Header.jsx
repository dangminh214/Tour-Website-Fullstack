import TourHeader from "./TourHeader.jsx";
import DestinationHeader from "./DestinationHeader.jsx";
import SearchTourUsingDestination from "./SearchTourUsingDestination.jsx";

export default function Header({ setTours }) {
  return (
    <div className="headerComponent">
      <a
        href="http://localhost:3000"
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
          All Tours
        </button>
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href = "http://localhost:3000/destination")
          }
        >
          All Destinations
        </button>
      </div>
      <div className="createNewLinkDestination">
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href = "http://localhost:3000/tours/newTour")
          }
        >
          New Tour
        </button>
        <button
          className="createNewLink"
          onClick={() =>
            (window.location.href =
              "http://localhost:3000/destination/newDestination")
          }
        >
          New Destination
        </button>
      </div>
    </div>
  );
}
