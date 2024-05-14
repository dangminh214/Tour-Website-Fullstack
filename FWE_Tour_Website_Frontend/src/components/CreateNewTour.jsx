import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateNewTour = () => {
  // State variables to store form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinations, setDestinations] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [allDestinations, setAllDestinations] = useState([]);

  // Fetch all destinations from backend API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/destination');
        console.log(response)
        setAllDestinations(response.data.destinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert destinations string to an array of strings
      const destinationsArray = destinations.split(',').map(destination => destination.trim());

      const newTour = { name, description, destinations: destinationsArray, imageCover };
      // Send POST request to backend API to create a new tour
      const response = await axios.post('http://localhost:8000/tours/newTour', newTour);
      console.log('New tour created:', response.data);
      // Clear form after successful submission
      setName('');
      setDescription('');
      setDestinations('');
      setImageCover('');
    } catch (error) {
      console.error('Error creating new tour:', error);
    }
  };

  return (
    <div>
      <h2>Neue Reise</h2>
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
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="destinations">Destinations:</label>
          <select
            id="destinations"
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            required
          >
            <option value="">Select a destination...</option>
            {allDestinations.map(destination => (
              <option key={destination._id} value={destination._id}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="imageCover">Image Fotos URL:</label>
          <input
            type="text"
            id="imageCover"
            value={imageCover}
            onChange={(e) => setImageCover(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Tour</button>
      </form>
    </div>
  );
};

export default CreateNewTour;
