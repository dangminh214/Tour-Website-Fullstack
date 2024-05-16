import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Home,
  AllTours,
  AllDestinations,
  TourDetail,
  DestinationDetail,
  CreateNewTour,
  CreateNewDestination,
  NoTourError,
  NoDestinationError,
} from "./ExportPages";

import "./index.css";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/tours" element={<AllTours />} />
          <Route path="/destination" element={<AllDestinations />} />

          <Route path="/tours/newTour/" element={<CreateNewTour />} />
          <Route
            path="/destination/newDestination/"
            element={<CreateNewDestination />}
          />
          <Route path="/tours/tourError" element={<NoTourError />} />
          <Route
            path="/destination/destinationError"
            element={<NoDestinationError />}
          />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          {/* <Route path="/profile/:username" element={<Profile />} /> */}
        </Routes>
      </main>
      <footer></footer>
    </Router>
  );
}

export default App;
