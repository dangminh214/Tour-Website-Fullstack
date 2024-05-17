import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SingleDestination from "../components/SingleDestination";
const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8000/destination");
        const data = await response.json();
        console.log("Response from server:", data);
        if (data.status === "success") {
          setDestinations(data.destinations);
        } else {
          console.error("Failed to fetch destinations:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <>
      <Header />
      <h1 id="destinationList">Reisenziele Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="destinationContainer">
          {destinations.map((destination) => (
            <>
              <SingleDestination destination={destination} />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default DestinationList;
