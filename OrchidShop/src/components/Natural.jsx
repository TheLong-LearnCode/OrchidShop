import React, { useEffect, useState } from 'react'
import { Orchids } from '../../ListOfOrchids'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'

export default function Natural() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const [orchid, setOrchid] = useState({})
    const [specialOrchids, setSpecialOrchids] = useState([]);

    useEffect(() => {
        const filteredOrchids = Orchids.filter(orchid => orchid.isSpecial);
        setSpecialOrchids(filteredOrchids);
    }, []);

    return (
        <div style={{ marginTop: '100px' }}>
            <div className="container mt-4">
                <h2 className="text-center mb-4">Speacial</h2>
                <div className="row">
                    {specialOrchids.map((orchid) => (
                        <div key={orchid.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img src={orchid.image} className="card-img-top" alt={orchid.name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                                    <h5 className="card-title">{orchid.name}</h5>
                                    <p className="card-text">Origin: {orchid.origin}</p>
                                    <p className="card-text">Color: {orchid.color}</p>
                                    <p className="card-text">
                                        Rating:
                                        <span className="ms-1 text-warning">
                                            {'★'.repeat(Math.floor(orchid.rating))}
                                            {'☆'.repeat(5 - Math.floor(orchid.rating))}
                                        </span>
                                        <span className="ms-1">({orchid.rating}/5)</span>
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
