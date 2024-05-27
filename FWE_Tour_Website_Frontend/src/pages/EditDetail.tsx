import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import { useLocation } from "react-router-dom";

const EditDetail = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [destinations, setDestinations] = useState<string[]>([]);
  const [imageCover, setImageCover] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [isTourCreated, setIsTourCreated] = useState(false);
  const [warningMessage] = useState("")
  const [selectedArray, setSelectedArray] = useState<string[]>([]);
  const location = useLocation();
  const takenData = location.state?.tour;

  interface Destination {
    _id: string;
    name: string;
  }

  console.log("takenData", takenData);

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
    const newImageCover: string[] = [...imageCover];
    newImageCover[index] = event.target.value;
    setImageCover(newImageCover);
  };

  const handleAddImageUrl = () => {
    setImageCover([...imageCover, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    setImageCover(imageCover.filter((_, i) => i !== index));
  };

  const handleAddDestination = () => {
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setDestinations([...destinations, selectedDestination]);
      setSelectedArray([...selectedArray, selectedDestination]);
      setSelectedDestination(null);
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const updatedTour = { name, description, destinations, imageCover };
      if (destinations.length === 0) {
        setShowWarning(true);
        return;
      }
      console.log("updatedTour before update", takenData);
      console.log("update data", updatedTour)
      const response = await axios.patch(
        `http://localhost:8000/tours/updateTourByName/${takenData.name}`,
        updatedTour
      );
      console.log("res", response)
      console.log("Tour updated:", response.data);
      if (response.data) {
        setSuccessMessage("The tour has been updated successfully");
        setIsTourCreated(true);
      }
      setName("");
      setDescription("");
      setDestinations([]);
      setImageCover([]);
    } catch (error: any) {
      console.error("Error creating new tour:", error.response.data);
      setErrorMessage("The tour can not be updated, please try again!");
    }
  };

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
            <h2 className="newFormTitel">Edit Tour</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <textarea
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder={takenData.name}
                />
              </div>
              <div>
                <label htmlFor="description">Decscription:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={takenData.description}
                ></textarea>
              </div>

              <label htmlFor="destinations">Destinations:</label>
              <select
                id="destinations"
                value={selectedDestination ?? ""}
                onChange={(e) => setSelectedDestination(e.target.value)}
              >
                <option value="">Choose at least one destination</option>
                {allDestinations.length > 0 &&
                  allDestinations.map(
                    (destination) =>
                      !destinations.includes(destination._id) && (
                        <option key={destination.name} value={destination._id}>
                          {destination.name}
                        </option>
                      )
                  )}
              </select>
              <button type="button" onClick={handleAddDestination}>
                Add Destination
              </button>
              <ul className="destinationList">
                {destinations.map((destinationId, index) => {
                  const destination = allDestinations.find(
                    (dest) => dest._id === destinationId
                  );
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
                    Entfernen
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddImageUrl}>
                Add Foto URL
              </button>
              {showWarning && (
                <WarningPopup
                  message="A tour must have at least one destination"
                  onClose={closeWarning}
                />
              )}
              <button type="submit">Update</button>
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

export default EditDetail;
