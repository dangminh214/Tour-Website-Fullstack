import ReiseHeader from  './ReiseHeader.jsx'
import DestinationHeader from "./DestinationHeader.jsx"

export default function Header () {
  return (
    <div className="headerComponent">
      <ReiseHeader/>
      <DestinationHeader/>
    </div>
  )
}