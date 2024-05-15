import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const CreateDestinationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageCover, setImageCover] = useState([""]);

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
      <form className="createDestinationForm" onSubmit={handleSubmit}>
        <h3>Neues Reiseziel</h3>
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
          Beschreibung:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Fotos:
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
                Foto URL entfernen
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImageCover}>
            Foto URLS Hinzufügen
          </button>
        </label>
        <button type="submit">Neues Reiseziel erstellen</button>
      </form>
    </>
  );
};

export default CreateDestinationForm;
