import TourHeader from "./TourHeader.jsx";
import DestinationHeader from "./DestinationHeader.jsx";
import SearchTourUsingDestination from "./SearchTourUsingDestination.jsx";

export default function Header({ setTours }) {
  return (
    <div className="headerComponent">
      <img
        src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais"
        alt="Logo"
        className="logoHeader"
        onClick={() => (window.location.href = "http://localhost:3000/tours")}
      />
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
}
