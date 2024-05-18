import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import SingleTour from "../components/SingleTour.jsx";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:8000/tours`);
      const data = await response.json();
      document.title = data.title;
    };
    fetchTitle();
  }, []);

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
      <Header setTours={setTours} />
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

export default Home;
