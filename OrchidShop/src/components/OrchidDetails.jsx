import React, { Component, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Orchids } from '../../ListOfOrchids'
import ModalCase from './ModalCase';


export default function OrchidDetails() {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams()
    const orchid = Orchids.find(o => o.id === id)

    if (!orchid) return <div>Orchid not found</div>

    return (
        <div className='container-fluid' style={{ width: '90%', marginTop: '100px' }}>
            <div className="row">
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
