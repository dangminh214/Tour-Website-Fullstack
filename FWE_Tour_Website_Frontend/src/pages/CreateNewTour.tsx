import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const CreateNewTour = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>();
  const [imageCover, setImageCover] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allDestinations, setAllDestinations] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isTourCreated, setIsTourCreated] = useState(false);
  const [warningMessage] = useState("");

  const selectedArray = [];

  interface Destination {
    _id: string;
    name: string;
  }

  const WarningPopup = ({ message, onClose }: { message: string, onClose: () => void }) => (
    <div className="warning-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );

  const closeWarning = () => {
    setShowWarning(false);
  };

  const handleImageUrlChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newImageCover = [...imageCover];
    newImageCover[index] = event.target.value;
    setImageCover(newImageCover);
  };

  // Handler for adding a new image URL input field
  const handleAddImageUrl = () => {
    setImageCover([...imageCover, ""]);
  };

  // Handler for removing an image URL input field
  const handleRemoveImageUrl = (index: number) => {
    setImageCover(imageCover.filter((_, i) => i !== index));
  };

  // Function to handle adding a destination to the tour
  const handleAddDestination = () => {
    if (selectedDestination && !destinations?.includes(selectedDestination)) {
      setDestinations((prevDestinations) => [...prevDestinations, selectedDestination]); // Update state update to correctly handle the update
      selectedArray.push(selectedDestination);
      setSelectedDestination("");
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const newTour = { name, description, destinations, imageCover };
      if (destinations.length === 0) {
        setShowWarning(true);
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/tours/newTour",
        newTour
      );
      console.log("New tour created:", response.data);
      if (response.data) {
        setSuccessMessage("The tour has been sucessfully created");
        setIsTourCreated(true);
      }
      setName("");
      setDescription("");
      setDestinations([]);
      setImageCover([]);
    } catch (error) {
      console.error("Error creating new tour:", error);
      setErrorMessage(
        "Can not create a new tour, please try again"
      );
    }
  };

  // Fetch all destinations from backend API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/destination");
        setAllDestinations(response.data.destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <Header />
      <div className="createNewForm">
        {isTourCreated ? (
          <p>{successMessage}</p>
        ) : (
          <>
            <h2 className="newFormTitel">New Tour</h2>
            <form onSubmit={handleSubmit}>
              <div className="nameInput">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <label htmlFor="destinations">Destinations:</label>
              <select
                id="destinations"
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="">Please choose a destination</option>
                {allDestinations.map(
                  (destination: Destination) =>
                    !destinations.includes(destination._id) && (
                      <option key={destination._id} value={destination._id}>
                        {destination.name}
                      </option>
                    )
                )}
              </select>
              <button type="button" onClick={handleAddDestination}>
                Add destination
              </button>
              <ul className="destinationList">
                {destinations.map((destinationId, index) => {
                  const destination = allDestinations.find(
                    (dest: Destination) => dest._id === destinationId
                  ) as Destination | undefined;
                  return (
                    <div key={index}>
                      <p className="displayedDestination">
                        {destination
                          ? destination.name
                          : "Destination not found"}
                      </p>
                    </div>
                  );
                })}
              </ul>
              <label>Images URLs:</label>
              {imageCover.map((url, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={url}
                    onChange={(event) => handleImageUrlChange(index, event)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(index)}
                  >
                    Delete Image URL
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddImageUrl}>
                Add Image URL
              </button>
              {showWarning && (
                <WarningPopup
                  message="A tour must have at least one destination"
                  onClose={closeWarning}
                />
              )}
              <button type="submit">Create new tour</button>
              {successMessage && <p className="successMsg">{successMessage}</p>}
              {errorMessage && <p className="warning-popup">{errorMessage}</p>}
            </form>
          </>
        )}
        {warningMessage && (
          <div className="warning-popup">
            <h3>{warningMessage}</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateNewTour;
