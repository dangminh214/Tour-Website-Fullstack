import ReiseHeader from  './ReiseHeader.jsx'
import DestinationHeader from "./DestinationHeader.jsx"

export default function Header () {
  return (
    <div className="header">
      <ReiseHeader/>
      <div className="spacer" style={{ width: '20px' }}></div>
      <DestinationHeader/>
    </div>
  )
}