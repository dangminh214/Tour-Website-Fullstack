import React, { useState, useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import Header from "../components/Header";
import SlideImage from "../components/DetailContent/SlideImage";
import { useNavigate } from "react-router-dom";

const TourDetail = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [destinationMessage, setDestinationMessage] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");

  const navigate = useNavigate();

  const clickEdit = () => {
    navigate("/edit", {
      state: { tour },
    });
  };

  const url = window.location.pathname;
  const parts = url.split("/").filter(Boolean);
  const lastParam = parts[parts.length - 1];

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:8000/tours/${lastParam}`);
      const data = await response.json();
      if (!data.title) {
        data.title = "ERROR";
      }
      document.title = `FWE | ${data.title}`;
    };
    fetchTitle();
  }, [lastParam]);

  useEffect(() => {
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
  }, [lastParam]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8000/destination");
        const data = await response.json();
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
            setMessage("This tour has been successfully deleted");
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
        throw new Error("This destination can not be added");
      }
      setTour((prevTour) => ({
        ...prevTour,
        destinations: [...prevTour.destinations, selectedDestination],
      }));
      setDestinationMessage("The destination has been added to this tour");
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
      const deleteData = await response.json();
      console.log("deleteData", deleteData);
      console.log("deleteData.stauts", deleteData.stauts);

      if (deleteData.status === "fail") {
        setDestinationMessage(
          "The Destination can not be deleted. A tour must have at least one destination"
        );
      } else {
        setDestinationMessage("The destination has been deleted");
        window.location.reload();
      }
    } catch (error) {
      setDestinationMessage(
        "You do not have permission to delete this destination"
      );
    }
  };

  return (
    <>
      <Header />
      <div className="detailPage">
        {loading ? (
          <p className="warning-msg">Loading...</p>
        ) : (
          <div className="detailContainer">
            <h1 className="nameDetail">{tour.name}</h1>
            {tour.imageCover && tour.imageCover.length > 0 ? (
              <SlideImage imagesURLs={tour.imageCover} />
            ) : (
              <p>No images</p>
            )}
            <p className="descriptionDetail">{tour.description}</p>
            <h3>Destination</h3>
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
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>This Tour does not have any destinations ERROR</p>
            )}
            <div>
              <select
                value={selectedDestination}
                className="select-dropdown"
                onChange={handleSelectChange}
              >
                <option value="">Choose a destination to add</option>
                {destinations.map((destination) => (
                  <option key={destination._id} value={destination._id}>
                    {destination.name}
                  </option>
                ))}
              </select>
              <button onClick={addDestination}>Destination add</button>
            </div>
            <button className="deleteTourButton" onClick={deleteTour}>
              Delete this tour
            </button>
            {message && <p className="deleteMessage">{message}</p>}
            {destinationMessage && (
              <p className="addDestinationMessage">{destinationMessage}</p>
            )}
            <button className="editButton" onClick={clickEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TourDetail;
