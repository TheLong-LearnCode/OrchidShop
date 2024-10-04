import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'

export default function Content({orchidData}) {
  const { theme, toggle, dark } = useContext(ThemeContext)
  const [orchid, setOrchid] = useState({})
  
  return (
    <div className="container" style={{ backgroundColor: theme.backgroundColor, marginTop: '100px'}}>
      <h1 className="text-center mb-4" style={{ color: theme.color, paddingTop: '20px' }}>Orchid Collection</h1>
      <div className="row">
        {orchidData.map((orchid) => (
          <div className="col-md-3" key={orchid.id}>
            <div className="card m-3" style={{ width: '18rem', minHeight: '200px', backgroundColor: theme.backgroundColor, borderColor: theme.color}}>
              <img src={orchid.image} className="card-img-top" alt={orchid.name} style={{ width: '100%' , objectFit: 'cover', height: '190px'}}/>
              <div className="card-body">
                <h5 className="card-title" style={{ color: theme.color }}>{orchid.name}</h5>
                <p className="card-text" style={{ color: theme.color }}>
                  <strong>Rating:</strong> {orchid.rating} ⭐<br />
                </p>
                <Link to={`/details/${orchid.id}`} ><button className="btn" onClick={() => setOrchid(orchid)} style={{ backgroundColor: theme.color, color: theme.backgroundColor, borderColor: theme.color }}>More Details</button></Link>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
