import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import SingleDestination from "../components/SingleDestination";

interface Tour {
  _id: string;
  name: string;
}

interface Destination {
  _id: string;
  name: string;
  description: string;
  imageCover: string[];
  tours: Tour[];
}

const DestinationList: React.FC = () => {
  const [, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:8000/destination`);
      const data = await response.json();
      document.title = data.title;
    };
    fetchTitle();
  }, []);

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
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };
  
    fetchDestinations();
  }, []);
  return (
    <>
      <Header  setTours={setTours}/>
      <h1 id="destinationList" className="titleList">
        Destination List
      </h1>
      {loading ? (
        <p className="warning-msg">Loading...</p>
      ) : (
        <div className="allDetailsContainer">
          {destinations.map((destination) => (
            <SingleDestination key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </>
  );
};

export default DestinationList;