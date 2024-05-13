import ReiseHeader from  './TourHeader.jsx'
import DestinationHeader from "./DestinationHeader.jsx"

export default function Header () {
  return (
    <div className="headerComponent">
      <ReiseHeader/>
      <DestinationHeader/>
    </div>
  )
}