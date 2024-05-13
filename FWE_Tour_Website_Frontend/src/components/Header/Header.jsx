import ReiseHeader from  './TourHeader.jsx'
import DestinationHeader from "./DestinationHeader.jsx"

export default function Header () {
  return (
    <div className="headerComponent">
      <a  href="http://localhost:3000/tours">
        <img
        src="https://img.freepik.com/free-vector/detailed-travel-logo_23-2148616611.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais"
        alt="Logo"
        className="logoHeader"
        >
        </img> 
      </a>
      <ReiseHeader/>
      <DestinationHeader/>
    </div>
  )
}