import React, { useState, useEffect } from 'react';

const DestinationDetail = () => {
  const [destination, setDestination] = useState({});
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const url = window.location.pathname; // Get the path portion of the URL
    const parts = url.split("/").filter(Boolean); // Split the path by "/", filter out empty strings
    const lastParam = parts[parts.length - 1]; // Get the last element from the array
    const fetchDestinationDetail = async (destinationName) => {
      try {
        const response = await fetch(`http://localhost:3000/destination/${destinationName}`);
        console.log('Response from server:', response);
        const responseData = await response.json();
        console.log('Response from server:', responseData);
        if (responseData.status === 'success') {
          setDestination(responseData.data.destination);
        } else {
          console.error('Failed to fetch destination:', responseData.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching destination:', error);
        setLoading(false);
      }
    };

    fetchDestinationDetail(lastParam);
  }, []);

  return (
    <div>
      <h1>Destination Detail</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        destination ? (
          <div>
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
            {destination.imageCover && destination.imageCover.length > 0 ? (
              <img
                src={destination.imageCover[0]} // Assuming the imageCover is an array with at least one image URL
                alt={destination.name}
              />
            ) : (
              <p>No images yet</p>
            )}
            <h3>Tours with this destination:</h3>
            {destination.tours && destination.tours.length > 0 ? (
              <ul>
                {destination.tours.map((tour) => (
                  <li key={tour._id}><a key={tour._id} href={`http://localhost:8000/tours/${tour.name}`}>{tour.name}</a></li>
                ))}
              </ul>
            ) : (
              <p>No tours found with this destination</p>
            )}
          </div>
        ) : (
          <p>Destination not found</p>
        )
      )}
    </div>
  );
};

export default DestinationDetail;
