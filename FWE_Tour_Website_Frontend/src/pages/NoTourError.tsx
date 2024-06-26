import Header from "../components/Header";
import React, { useEffect } from "react";

const url = window.location.pathname;
const parts = url.split("/").filter(Boolean);
const lastParam = parts[parts.length - 1];

const NoTourError = () => {
  useEffect(() => {
    const fetchTitle = async () => {
      const response = await fetch(`http://localhost:8000/tours/${lastParam}`);
      const data = await response.json();
      if (!data.title) {
        data.title = "ERROR";
      }
      document.title = `FWE | ${data.title}`;
    };
    fetchTitle();
  }, []);

  return (
    <>
      <Header />
      <h1 className="headerError">Can not find this tour</h1>
    </>
  );
};
export default NoTourError;
