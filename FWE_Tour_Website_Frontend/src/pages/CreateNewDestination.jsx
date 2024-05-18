import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";

const CreateDestinationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageCover, setImageCover] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const WarningPopup = ({ message, onClose }) => (
    <div className="warning-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );

  const closeWarning = () => {
    setShowWarning(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDestination = {
        name,
        description,
        imageCover,
      };
      await axios.post(
        "http://localhost:8000/destination/newDestination",
        newDestination
      );
      setName("");
      setDescription("");
      setImageCover([""]);
      setSuccessMessage("Das Reiseziel wurde erfolgreich erstellt");
    } catch (error) {
      console.error("Error creating new destination:", error);
    }
  };

  const handleImageCoverChange = (index, event) => {
    const newImageCover = [...imageCover];
    newImageCover[index] = event.target.value;
    setImageCover(newImageCover);
  };

  const handleAddImageCover = () => {
    setImageCover([...imageCover, ""]);
  };

  const handleRemoveImageCover = (index) => {
    setImageCover(imageCover.filter((_, i) => i !== index));
  };

  return (
    <>
      <Header />
      <form className="createNewForm" onSubmit={handleSubmit}>
        <h2>New Destination</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <label>
          Images:
          {imageCover.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageCoverChange(index, e)}
              />
              <button
                type="button"
                onClick={() => handleRemoveImageCover(index)}
              >
                Image URL delete
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImageCover}>
            Image URL
          </button>
        </label>
        <button type="submit">Create New Destination</button>
        {showWarning && (
          <WarningPopup
            message="Eine Reise muss mindesten ein Ziel haben"
            onClose={closeWarning}
          />
        )}
        {successMessage && <p className="successMsg">{successMessage}</p>}
        {errorMessage && <p className="warning-popup">{errorMessage}</p>}
      </form>
    </>
  );
};

export default CreateDestinationForm;
