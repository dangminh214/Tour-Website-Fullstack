import React, { useState, useEffect } from "react";
import Header from "../components/Header/index.jsx";
import SingleTour from "../components/SingleTour.jsx";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:8000/tours");
        const data = await response.json();
        console.log("Response from server:", data);
        if (data.status === "success") {
          setTours(data.tours);
        } else {
          console.error("Failed to fetch tours:", data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <>
      <Header />
      <h1 id="tourList">Reisen Liste</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tourContainer">
          {tours.map((tour) => (
            <SingleTour key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </>
  );
};

export default ToursList;
