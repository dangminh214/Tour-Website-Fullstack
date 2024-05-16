import React, { useState, useEffect } from 'react';

const TourWithInputDestination = () => {
  const [tours, setTours] = useState([]);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`http://localhost:8000/tours/findTourByDestination/${destination}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching tours');
        }
        const data = await response.json();
        console.log('Tours:', data);
        setTours(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (destination) {
      fetchTours();
    }
  }, [destination]);

  return (
    <div>
      {tours.length > 0 ? (
        tours.map((tour) => (
          <div key={tour._id}>
            <h2>{tour.name}</h2>
            {/* Add more details about the tour here */}
          </div>
        ))
      ) : (
        <p className='warning-popup'>Keine Reise mit diesem Ziel</p>
      )}
    </div>
  );
};

export default TourWithInputDestination;