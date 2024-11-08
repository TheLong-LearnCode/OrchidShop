import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'

export default function Natural() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const [orchids, setOrchids] = useState([])
    const [specialOrchids, setSpecialOrchids] = useState([]);

    const fetchAPI = ()=>{
        fetch( `https://67178885b910c6a6e028bc88.mockapi.io/orchids`)
        .then(resp => resp.json())
        .then(data => setOrchids(data))
        .catch(err=> console.error(err))
       } 
       useEffect(() => {
        fetchAPI()
       }, [])

    useEffect(() => {
        const filteredOrchids = orchids.filter(orchid => orchid.isSpecial);
        setSpecialOrchids(filteredOrchids);
    }, [orchids]);

    return (
        <div style={{ paddingTop: '100px' }}>
            <div className="container mt-4">
                <h2 className="text-center mb-4" style={{color: theme.color}}>Speacial</h2>
                <div className="row">
                    {specialOrchids.map((orchid) => (
                        <div key={orchid.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={orchid.image} className="card-img-top" alt={orchid.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                                    <h5 className="card-title">{orchid.name}</h5>
                                    <p className="card-text"><strong>Origin:</strong> {orchid.origin}</p>
                                    <p className="card-text"><strong>Color:</strong> {orchid.color}</p>
                                    <p className="card-text">
                                        <strong>Rating:</strong>
                                        <span style={{marginLeft: '10px'}}>
                                            {Array.from({ length: Math.floor(orchid.rating) }, (_, index) => (
                                                <i key={`filled-${index}`} className="bi bi-star-fill text-warning"></i>
                                            ))}
                                            {Array.from({ length: 5 - Math.floor(orchid.rating) }, (_, index) => (
                                                <i key={`empty-${index}`} className="bi bi-star text-warning"></i>
                                            ))}
                                        </span>
                                    </p>
                                    <Link to={`/details/${orchid.id}`} ><button className="btn" onClick={() => setOrchid(orchid)} style={{ backgroundColor: theme.color, color: theme.backgroundColor, borderColor: theme.color }}>More Details</button></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
