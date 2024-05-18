import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import { Link } from "react-router-dom";
import { SlideImage } from "../components/DetailContent/SlideImage.jsx";
import { useRef } from "react";

const Home = () => {
  const [tours, setTours] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:8000/`);
      const data = await response.json();
      document.title = data.title;
    };
    fetchTitle();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const responseTour = await fetch("http://localhost:8000/tours");
        const data = await responseTour.json();
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

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const responseDestination = await fetch(
          "http://localhost:8000/destination"
        );
        const data = await responseDestination.json();
        console.log("Response from server:", data);
        if (data.status === "success") {
          setDestinations(data.destinations);
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

  //const imageURLs = useRef([]);
  /* const [imageURLs, setImageURLs] = useState([]);
  setImageURLs(
    "https://cdn.getyourguide.com/img/tour/63fdf1419ef04.jpeg/98.jpg",
    "https://t3.ftcdn.net/jpg/02/50/23/20/360_F_250232047_z9kCGCC2l3NShBNy1BJ8H3nVe9pWpnff.jpg"
  ); */

  return (
    <>
      <Header setTours={setTours} />
      <h1 id="tourList" className="titleList">
        Welcome to my tour website! I hope you like it 😁
      </h1>
      {loading ? (
        <p className="warning-msg">Loading...</p>
      ) : (
        <>
          <SlideImage imageURLs={imageURLs} />
          <div className="allDetailsContainer">
            <p>In this website, I have {tours.length} Tours</p>
          </div>
          <div className="allDetailsContainer">
            <p>In this website, I have {destinations.length} Destinations</p>
          </div>
          <div className="allDetailsContainer">
            <Link to="/tours">Let's see all the tours!</Link>
          </div>
          <div className="allDetailsContainer">
            <Link to="/destination">Let's see all the destinations!</Link>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
