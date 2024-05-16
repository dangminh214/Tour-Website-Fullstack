import React, { useState, useEffect } from "react";
import Header from "../components/Header";
const DestinationDetail = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const url = window.location.pathname; // Get the path portion of the URL
    const parts = url.split("/").filter(Boolean); // Split the path by "/", filter out empty strings
    const lastParam = parts[parts.length - 1]; // Get the last element from the array
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
  }, []);

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
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : destination ? (
        <div className="destiantionDetailContainer">
          <h1 className="destinationNameDetail">{destination.name}</h1>
          <p className="destiantiobnDescriptionDetail">
            {destination.description}
          </p>
          {destination.imageCover && destination.imageCover.length > 0 ? (
            destination.imageCover.map((imageUrl, index) => (
              <img
                className="destinationImagesDetail"
                key={index}
                src={imageUrl}
                alt={destination.name}
              />
            ))
          ) : (
            <p>Keine Fotos</p>
          )}
          <h3>Reise mit diesem Reiseziel:</h3>
          {destination.tours && destination.tours.length > 0 ? (
            <p className="tourThroughDestination">
              {destination.tours.map((tour) => (
                <li key={tour._id}>
                  <a
                    className="linkTour"
                    key={tour._id}
                    href={`http://localhost:3000/tours/${tour.name}`}
                  >
                    {tour.name}
                  </a>
                </li>
              ))}
            </p>
          ) : (
            <p>Keine Reise mit diesem Reiseziel</p>
          )}
          <button onClick={deleteDestination}>Löschen</button>
        </div>
      ) : (
        <p>Reiseziel nicht gefunden</p>
      )}
      {message && <p className="deleteMessage">{message}</p>}
    </div>
  );
};

export default DestinationDetail;
