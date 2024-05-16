import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const TourDetail = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [destinationMessage, setDestinationMessage] = useState("");

  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  useEffect(() => {
    const url = window.location.pathname; // Get the path portion of the URL
    const parts = url.split("/").filter(Boolean); // Split the path by "/", filter out empty strings
    const lastParam = parts[parts.length - 1]; // Get the last element from the array
    const fetchTourDetail = async (tourName) => {
      try {
        const response = await fetch(`http://localhost:8000/tours/${tourName}`);
        const data = await response.json();
        console.log("Response from server:", data);
        if (data.status === "success") {
          setTour(data.data.tour);
        } else {
          console.error("Failed to fetch tour:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour:", error);
        setLoading(false);
      }
    };
    fetchTourDetail(lastParam);
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8000/destination");
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          setDestinations(data.destinations);
        } else {
          console.error("Failed to fetch destinations:", data.message);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  const deleteTour = async () => {
    if (window.confirm("Sind Sie sicher, diese Reise zu löschen")) {
      try {
        // Fetch the tour details to get the tourId
        const response = await fetch(
          `http://localhost:8000/tours/${tour.name}`
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          const tourId = data.data.tour._id;

          // Delete the tour using the tourId
          const deleteResponse = await fetch(
            `http://localhost:8000/tours/deleteATour/${tourId}`,
            {
              method: "DELETE",
            }
          );

          if (deleteResponse.ok) {
            // Check if the status is 200-299
            setMessage("Diese Reise wurde erfolgreich gelöscht");
          } else {
            alert("Failed to delete tour");
          }
        } else {
          console.error("Failed to fetch tour:", data.message);
        }
      } catch (error) {
        console.error("Error deleting tour:", error);
        alert("Failed to delete tour");
      }
    }
  };

  const addDestination = async () => {
    if (!selectedDestination) {
      console.error("No destination selected");
      return;
    }
    console.log("tour.destination", tour.destinations);
    console.log("selectedDestination", selectedDestination);
    if (tour.destinations.includes(selectedDestination)) {
      console.error("Destination already exists in the tour");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/tours/${tour.name}/addDestination`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ destinations: [selectedDestination] }),
        }
      );
      if (!response.ok) {
        throw new Error("Das Reiseziel kann nicht hinzugefügt werden");
      }
      setTour((prevTour) => ({
        ...prevTour,
        destinations: [...prevTour.destinations, selectedDestination],
      }));
      setDestinationMessage("Das Reiseziel wurde erfolgreich addiert");
    } catch (error) {
      console.error("Error adding destination to the tour:", error);
    }
    window.location.reload();
  };

  const removeDestination = async (destinationName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/tours/${tour.name}/removeDestination/${destinationName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error, kann nicht erfernen");
      }
      // Update the tour in the state to reflect the change
      setTour((prevTour) => ({
        ...prevTour,
        destinations: prevTour.destinations.filter(
          (destination) => destination.name !== destinationName
        ),
      }));

      setDestinationMessage("Das Reiseziel wurde erfolgreich entfernt");
    } catch (error) {
      console.error("Error removing destination from the tour:", error);
      setDestinationMessage("Failed to remove destination");
    }
  };

  return (
    <>
      <Header />
      <div className="detailPage">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="detailContainer">
            <h1 className="tourNameDetail">{tour.name}</h1>
            {tour.imageCover && tour.imageCover.length > 0 ? (
              tour.imageCover.map((imageUrl, index) => (
                <img
                  className="imagesDetail"
                  key={index}
                  src={imageUrl}
                  alt={tour.name}
                />
              ))
            ) : (
              <p>Keine Fotos</p>
            )}
            <p className="descriptionDetail">{tour.description}</p>
            <h3>Reiseziele</h3>
            {tour.destinations && tour.destinations.length > 0 ? (
              <div>
                {tour.destinations.map((destination) => (
                  <div key={destination._id} className="tourDestinations">
                    <a
                      key={destination._id}
                      href={`http://localhost:3000/destination/${destination.name}`}
                    >
                      {destination.name}
                    </a>
                    <button
                      className="deleteButton"
                      onClick={() => removeDestination(destination.name)}
                    >
                      Löschen
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Diese Reise hat kein Reiseziel ERROR</p>
            )}
            <div>
              <select
                value={selectedDestination}
                className="select-dropdown"
                onChange={handleSelectChange}
              >
                <option value="">Wählen Sie ein Reiseziel zu addieren</option>
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>
                    {destination.name}
                  </option>
                ))}
              </select>
              <button onClick={addDestination}>Reiseziel hinzufügen</button>
            </div>
            <button className="deleteTourButton" onClick={deleteTour}>
              Diese Reise Löschen
            </button>
            {message && <p className="deleteMessage">{message}</p>}
            {destinationMessage && (
              <p className="addDestinationMessage">{destinationMessage}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TourDetail;
