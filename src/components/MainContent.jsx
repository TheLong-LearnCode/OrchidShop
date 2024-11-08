import React, { useContext, useEffect, useState } from 'react'
import Content from './Content'
import { ThemeContext } from './ThemeContext'

export default function MainContent() {
  const [orchids, setOrchids] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState('')
  const { theme } = useContext(ThemeContext)

  const fetchAPI = () => {
    fetch(`https://67178885b910c6a6e028bc88.mockapi.io/orchids`)
      .then(resp => resp.json())
      .then(data => setOrchids(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  // Lọc orchids dựa trên searchTerm
  const filteredOrchids = orchids.filter(orchid =>
    orchid.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || orchid.category === selectedCategory)
  )

  return (
    <div className="container" style={{ backgroundColor: theme.backgroundColor, paddingTop: '100px' }}>
      <h1 className="text-center mb-4" style={{ color: theme.color, paddingTop: '20px' }}>Orchid Collection</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-md-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search orchids by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-dark" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>

        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {orchids.map((oc) => (
              <option key={oc.id} value={oc.category}>{oc.category}</option>
            ))}
          </select>
        </div>

      </div>
      
      {filteredOrchids.length > 0 
      ?<Content orchidData={filteredOrchids} />
      : <div className='d-flex align-items-center flex-column justify-content-center' style={{ height:'200px'}}>
          <i style={{fontSize: '2rem'}} className="bi bi-ban"></i>
          <h2>No Orchid Found!</h2>
      </div>
      }
    </div>
  )
}

