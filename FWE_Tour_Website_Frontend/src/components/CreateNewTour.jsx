import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNewTour = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [imageCover, setImageCover] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [allDestinations, setAllDestinations] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const selectedArray = [];

  const WarningPopup = ({ message, onClose }) => (
    <div className="warning-popup">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );

  const closeWarning = () => {
    setShowWarning(false);
  };

  const handleImageUrlChange = (index, event) => {
    const newImageCover = [...imageCover];
    newImageCover[index] = event.target.value;
    setImageCover(newImageCover);
  };
  
  // Handler for adding a new image URL input field
  const handleAddImageUrl = () => {
    setImageCover([...imageCover, '']);
  };
  
  // Handler for removing an image URL input field
  const handleRemoveImageUrl = (index) => {
    setImageCover(imageCover.filter((_, i) => i !== index));
  };

    // Function to handle adding a destination to the tour
  const handleAddDestination = () => {
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setDestinations([...destinations, selectedDestination]);
      selectedArray.push(selectedDestination)
      setSelectedDestination('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const newTour = { name, description, destinations, imageCover };
      if (destinations.length === 0) {
        setShowWarning(true);
        return;
      }
      const response = await axios.post('http://localhost:8000/tours/newTour', newTour);
      console.log('New tour created:', response.data);
      // Set the success message
      setSuccessMessage('Die Reise wurde erfolgreich erstellt');
      setName('');
      setDescription('');
      setDestinations([]);
      setImageCover([]);
    } catch (error) {
      console.error('Error creating new tour:', error);
      setErrorMessage('Die Reise kann nicht erstellt werden. Bitte Versuchen Sie nochmal');
    }
  };

  // Fetch all destinations from backend API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/destination');
        setAllDestinations(response.data.destinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="createNewForm">
        {!successMessage && (
          <>
            <h2 className="newFormTitel">Neue Reise</h2>
            <form onSubmit={handleSubmit}>
              <div>
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
                <label htmlFor="description">Beschreibung:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="destinations">Reiseziele:</label>
                <select
                  id="destinations"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                >
                  <option value="">Wählen ein Reiseziel</option>
                  {allDestinations.map(destination => (
                    !destinations.includes(destination._id) && (
                      <option key={destination.name} value={destination._id}>
                        {destination.name}
                      </option>
                    )
                  ))}
                </select>
                <button type="button" onClick={handleAddDestination}>Reiseziel hinzufügen</button>
                <ul className="destinationList">
                {destinations.map((destinationId, index) => {
                  const destination = allDestinations.find(dest => dest._id === destinationId);
                  return (
                    <div key={index}>
                      <p className="displayedDestination">{destination ? destination.name : 'Destination not found'}</p>
                    </div>
                  );
                })}
                </ul>
              </div>

              <div>
                <label>Bilder URLs:</label>
                {imageCover.map((url, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      value={url}
                      onChange={(event) => handleImageUrlChange(index, event)}
                    />
                    <button type="button" onClick={() => handleRemoveImageUrl(index)}>
                      Entfernen
                    </button>
                  </div>
                ))}
                <button type="button" onClick={handleAddImageUrl}>
                  Reise Fotos URL addieren
                </button>
              </div>
              {showWarning && <WarningPopup message="Eine Reise muss mindesten ein Ziel haben" onClose={closeWarning} />}
              <button type="submit">Neue Reise erstellen</button>
              {errorMessage && <p className='warning-popup'>{errorMessage}</p>}
            </form>
          </>
        )}
      {warningMessage && <div className="warning-popup"><h3>{warningMessage}</h3></div>}
    </div>
  );
};

export default CreateNewTour;
