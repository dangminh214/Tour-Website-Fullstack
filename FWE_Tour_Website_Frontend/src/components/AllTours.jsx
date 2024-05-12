import React, { useState, useEffect } from 'react';
import Header from "./Header/Header.jsx"

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header/>
      <h1 id='tourList'>Reisen Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
      <div className="tourContainer">

          {tours.map(tour => (
            <div key={tour._id} class="tourInfo">
              <h4>{tour.name}</h4>
              <a href={`http://localhost:8000/tours/${tour.name}`}>Mehrere Details</a>
              <p className = "tourDescription">{tour.description}</p>
              <img
                className="tourImage"
                src={tour.imageCover[0]}
                alt={tour.name}
              />
              <h4>Reisenziele</h4>
              
                {tour.destinations.map(destination => (
                    <a key={destination._id} href={`http://localhost:8000/destination/${destination.name}`}>{destination.name}</a>
                ))}
            </div>
          ))}
      </div>
      )}
    </>
  );
};

export default ToursList;
