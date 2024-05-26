import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.tsx";
import SingleTour from "../components/SingleTour.tsx";
import { useLocation } from "react-router-dom";

const AllTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const foundTours = location.state?.foundTours;

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

  const filteredTours = foundTours || tours;

  return (
    <>
      <Header setTours={setTours} />
      <h1 id="tourList" className="titleList">
        Tours List
      </h1>
      {loading ? (
        <p className="warning-msg">Loading...</p>
      ) : (
        <div className="allDetailsContainer">
          {filteredTours.map((tour) => (
            <SingleTour key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </>
  );
};

export default AllTours;
