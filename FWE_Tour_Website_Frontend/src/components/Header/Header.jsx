import ReiseHeader from  './TourHeader.jsx'
import DestinationHeader from "./DestinationHeader.jsx"

export default function Header () {
  return (
    <div className="headerComponent">
      <img
        src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais"
        alt="Logo"
        className="logoHeader"
        onClick={() => window.location.href="http://localhost:3000/tours"}
      />
      <ReiseHeader/>
      <DestinationHeader/>
      <div className='createNewLink'>
        <>
          <button className="createNewLink" onClick={() => window.location.href='http://localhost:3000/destination'}>Alle Reiseziele</button>
          
          <button className="createNewLink" onClick={() => window.location.href='http://localhost:3000/tours'}>Alle Reise</button>
        </>
        <p></p>
        <>
          <button className="createNewLink" onClick={() => window.location.href='http://localhost:3000/tours/newTour'}>Neue Reise</button>
     
          <button className="createNewLink" onClick={() => window.location.href='http://localhost:3000/destination/newDestination'}>Neues Reiseziel</button>
        </>
        
      </div>
    </div>
  )
}