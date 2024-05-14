import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:8000/destination'); 
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
      <h1 id="destinationList">Reisenziele Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='destinationContainer'>
          {destinations.map(destination => (
            <div key={destination._id} className='destinationInfo'>
              <h2 className='destinationTitle'>{destination.name}</h2>
              <a href={`http://localhost:3000/destination/${destination.name}`}>Mehrere Details</a>
              <p className = "destinationDescription">{destination.description}</p>
              <img 
                className="destinationImage" 
                src={destination.imageCover[0]}
                alt={destination.imageCover} 
              />
              <h4>Reisenziele</h4>
                {destination.tours.map(tour => (
                  <p>
                    <a key={tour._id} href={`http://localhost:3000/tours/${tour.name}`}>{tour.name}</a>
                  </p>  
                ))}
            </div> 
            ))}
        </div>  
      )}
    </div>
  );
};

export default DestinationList;
