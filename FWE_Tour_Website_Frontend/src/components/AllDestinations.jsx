import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:8000/destination'); 
        console.log('Response from server:', response);
        const data = await response.json();
        console.log('Response from server:', data);
        if (data.status === 'success') {
          setDestinations(data.destinations);
        } else {
          console.error('Failed to fetch destinations:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <Header/>
      <h1>Reisenziele Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {destinations.map(destination => (
            <li key={destination._id}>
              <h2>{destination.name}</h2>
              <p className = "destinationDescription">{destination.description}</p>
              <img 
                className="destinationImage" 
                src={destination.imageCover[0]}
                alt={destination.imageCover} 
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationList;
