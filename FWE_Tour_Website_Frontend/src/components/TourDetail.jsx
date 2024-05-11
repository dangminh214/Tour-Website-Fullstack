import React, { useState, useEffect } from 'react';

const TourDetail = () => {
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = window.location.pathname; // Get the path portion of the URL
    const parts = url.split("/").filter(Boolean); // Split the path by "/", filter out empty strings
    const lastParam = parts[parts.length - 1]; // Get the last element from the array
    const fetchTourDetail = async (tourName) => {
      try {
        const response = await fetch(`http://localhost:3000/tours/${tourName}`);
        console.log('Response from server:', response);
        const data = await response.json();
        console.log('Response from server:', data);
        if (data.status === 'success') {
          setTour(data.data.tour);
        } else {
          console.error('Failed to fetch tour:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour:', error);
        setLoading(false);
      }
    };

    fetchTourDetail(lastParam);
  }, []);


  return (
    <div>
      <h1>Tour Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>{tour.name}</h2>
          <p>{tour.description}</p>
          {tour.imageCover.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={tour.name} />
          ))}
          <h3>Destinations</h3>
          {tour.destinations && tour.destinations.length > 0 ? (
              <ul>
                {tour.destinations.map((destination) => (
                  <li key={destination._id}><a key={destination._id} href={`http://localhost:8000/destination/${destination.name}`}>{destination.name}</a></li>
                ))}
              </ul>
            ) : (
              <p>No destination found with this tour, but actually a tour must have atleast one destination</p>
            )}
        </div>
      )}
    </div>
  );
};

export default TourDetail;
