import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SlideImage from "../components/DetailContent/SlideImage";

const DestinationDetail = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const url = window.location.pathname;
  const parts = url.split("/").filter(Boolean);
  const lastParam = parts[parts.length - 1];

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(
        `http://localhost:8000/destination/${lastParam}`
      );
      const data = await response.json();
      document.title = `FWE | ${data.title}`;
    };
    fetchTitle();
  }, [lastParam]);

  useEffect(() => {
    const fetchDestinationDetail = async (destinationName) => {
      try {
        const response = await fetch(
          `http://localhost:8000/destination/${destinationName}`
        );
        const responseData = await response.json();
        console.log("Response from server:", responseData);
        if (responseData.status === "success") {
          setDestination(responseData.data.destination);
        } else {
          console.error("Failed to fetch destination:", responseData.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination:", error);
        setLoading(false);
      }
    };

    fetchDestinationDetail(lastParam);
  }, [lastParam]);

  const deleteDestination = async () => {
    if (window.confirm("Sind Sie sicher, dieses Reiseziel zu löschen")) {
      try {
        const deleteResponse = await fetch(
          `http://localhost:8000/destination/deleteADestination/${destination._id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          setMessage("Das Reiseziel wurde erfolgreich gelöscht");
        } else {
          alert("Failed to delete destination");
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
        alert("Failed to delete destination");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="detailPage">
        {loading ? (
          <p className="warning-msg">Loading...</p>
        ) : destination ? (
          <div className="detailContainer">
            <h1 className="nameDetail">{destination.name}</h1>

            {destination.imageCover && destination.imageCover.length > 0 ? (
              <SlideImage imagesURLs={destination.imageCover} />
            ) : (
              <p>Keine Fotos</p>
            )}
            <p className="descriptionDetail">{destination.description}</p>
            <h3>Reise mit diesem Reiseziel:</h3>
            {destination.tours && destination.tours.length > 0 ? (
              <div className="tourThroughDestination">
                {destination.tours.map((tour) => (
                  <p key={tour._id}>
                    <a
                      className="linkTour"
                      key={tour._id}
                      href={`http://localhost:3000/tours/${tour.name}`}
                    >
                      {tour.name}
                    </a>
                  </p>
                ))}
              </div>
            ) : (
              <p>Keine Reise mit diesem Reiseziel</p>
            )}
            <button className="deleteButton" onClick={deleteDestination}>
              Löschen
            </button>
          </div>
        ) : (
          <p>Reiseziel nicht gefunden</p>
        )}
        {message && <p className="deleteMessage">{message}</p>}
      </div>
    </>
  );
};

export default DestinationDetail;
