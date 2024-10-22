import React, { Component, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Orchids } from '../../ListOfOrchids'
import ModalCase from './ModalCase';
import { ThemeContext } from './ThemeContext';


export default function OrchidDetails() {
    const [orchid, setOrchid] = useState({})
    const { theme, toggle, dark } = useContext(ThemeContext)
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams()
    const fetchAPI = ()=>{
        fetch( `https://67178885b910c6a6e028bc88.mockapi.io/orchids/${id}`)
        .then(resp => resp.json())
        .then(data => setOrchid(data))
        .catch(err=> console.error(err))
       } 
       useEffect(() => {
        fetchAPI()
       }, [])

    if (!orchid) return <div>Orchid not found</div>

    return (
        <div className='container-fluid' style={{ width: '90%', paddingTop: '100px' }}>
            <div className="row" style={{color: theme.color}}>
                <h2 className="text-center col-md-12">{orchid.name}</h2>
                <img src={orchid.image} alt={orchid.name} className="img-fluid mt-3 d-block col-md-8" style={{ height: '500px', borderRadius: '10%', objectFit: 'cover' }} />
                <div className="col-md-4" style={{ marginTop: '150px' }}>
                    <p><strong>Category:</strong> {orchid.category}</p>
                    <p><strong>Color:</strong> {orchid.color}</p>
                    <p><strong>Origin:</strong> {orchid.origin}</p>
                    <p><strong>Rating:</strong> {orchid.rating}/5</p>
                    {orchid.isSpecial && <p style={{ background: 'linear-gradient(90deg, rgba(253,29,29,1) 73%, rgba(252,176,69,1) 100%)', color: 'white' }}>Special Orchid</p>}
                    <a onClick={() => setIsOpen(true)} >
                        <box-icon name='videos' type='solid' color='#ee0707' ></box-icon>
                    </a>
                </div>
            </div>

            {isOpen && <ModalCase setIsOpen={setIsOpen} orchid={orchid} />}

        </div>
    )
}
