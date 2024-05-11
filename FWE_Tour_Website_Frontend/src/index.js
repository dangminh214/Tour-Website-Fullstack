import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AllTours from './components/AllTours';
import AllDestinations from './components/AllDestinations';
import DestinationDetail from './components/DestinationDetail'; 
import TourDetail from './components/TourDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get the current URL path
const currentPath = window.location.pathname;

// Conditionally render the appropriate component based on the URL path
let componentToRender;
if (currentPath === '/tours' || currentPath === '/') {
  componentToRender = <AllTours />;
} else if (currentPath === '/destination') {
  componentToRender = <AllDestinations />;
} else if (currentPath.startsWith('/destination/')) { 
  componentToRender = <DestinationDetail />;
} else if (currentPath.startsWith('/tours/')) { 
  componentToRender = <TourDetail />;
} 
else {
  // Default component if URL path doesn't match any known routes
  componentToRender = <div>Page not found</div>;
}

// Render the selected component
root.render(
  <React.StrictMode>
    {componentToRender}
  </React.StrictMode>
);
