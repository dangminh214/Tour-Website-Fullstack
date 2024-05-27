import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SlideImage from "../components/DetailContent/SlideImage";

const DestinationDetail = () => {
  const [destination, setDestination] = useState({
    _id: null,
    imageCover: "",
    description: "", 
    tours: []
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const url = window.location.pathname;
  const parts = url.split("/").filter(Boolean);
  const lastParam = parts[parts.length - 1];

  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(
        `http://localhost:8000/destination/${lastParam}`
      );
      const data = await response.json();
      if (!data.title) {
        data.title = "ERROR";
      }
      document.title = `FWE | ${data.title}`;
    };
    fetchTitle();
  }, [lastParam]);

  useEffect(() => {
    const fetchDestinationDetail = async (destinationName: string) => {
      try {
        const response = await fetch(
          `http://localhost:8000/destination/${destinationName}`
        );
        const responseData = await response.json();
        console.log("Response from server:", responseData);
        if (responseData.status === "success") {
          setDestination(responseData.data.destination);
        } else {
          console.error("Failed to fetch destination:", responseData.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination:", error);
        setLoading(false);
      }
    };

    fetchDestinationDetail(lastParam);
  }, [lastParam]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const deleteDestination = async () => {
    if (window.confirm("Are you sure to delete this destination")) {
      try {
        const deleteResponse = await fetch(
          `http://localhost:8000/destination/deleteADestination/${destination._id}`,
          {
            method: "DELETE",
          }
        );

        if (deleteResponse.ok) {
          setMessage("The destination has been deleted");
        } else {
          alert("Failed to delete destination");
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
        alert("Failed to delete destination");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="detailPage">
        {loading ? (
          <p className="warning-msg">Loading...</p>
        ) : destination ? (
          <div className="detailContainer">
            <h1 className="nameDetail">{(destination as unknown as { name: string }).name}</h1>

            {destination.imageCover && destination.imageCover.length > 0 ? (
              <SlideImage imagesURLs={destination.imageCover} />
            ) : (
              <p>No Images</p>
            )}
            <p className="descriptionDetail">{destination.description}</p>
            <h3>Tours with this destination:</h3>
            {destination.tours && destination.tours.length > 0 ? (
              <div className="tourThroughDestination">
                {destination.tours.map((tour: any) => (
                  <p key={tour._id}>
                    <a
                      className="linkTour"
                      key={tour._id}
                      href={`http://localhost:3000/tours/${tour.name}`}
                    >
                      {tour.name}
                    </a>
                  </p>
                ))}
              </div>
            ) : (
              <p>No suitable tours exist</p>
            )}
            <button className="deleteButton" onClick={deleteDestination}>
              Delete
            </button>
          </div>
        ) : (
          <p>Can not find this destination</p>
        )}
        {message && <p className="deleteMessage">{message}</p>}
      </div>
    </>
  );
};

export default DestinationDetail;
