import React, { useState, useEffect } from 'react';
import Header from "./Header/Header.jsx"

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:3000/tours'); 
        console.log('Response from server:', response);
        const data = await response.json();
        console.log('Response from server:', data);
        if (data.status === 'success') {
          setTours(data.tours);
        } else {
          console.error('Failed to fetch tours:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you can do something with the form data, like sending it to an API
    console.log('Form submitted:', { searchQuery });

    // Reset form fields after submission
    setSearchQuery('');
  };

  return (
    <>
      <Header/>
      <h1>Reisen Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div>
        <ul>
          {tours.map(tour => (
            <li key={tour._id}>
              <h2>{tour.name}</h2>
              <p className = "tourDescription">{tour.description}</p>
              <h4>Reisenziele</h4>
              <ul>
                {tour.destinations.map(destination => (
                  <li key={destination._id}>
                    <a href={`http://localhost:8000/destination/${destination.name}`}>{destination.name}</a>
                  </li>
                ))}
              </ul>
              <img
                className="tourImage"
                src={tour.imageCover}
                alt={tour.name}
              />
            </li>
          ))}
        </ul>
      </div>
        
      )}
    </>
  );
};

export default ToursList;
