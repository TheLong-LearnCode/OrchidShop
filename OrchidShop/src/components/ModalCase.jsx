// src/components/ModalCase.jsx
import React from 'react'

export default function ModalCase({ setIsOpen, orchid }) {
  return (
    <div className='modal-show' onClick={() => setIsOpen(false)}>
        <div className="modal" id='modal1' style={{ display: 'block', top: '20%' }}>
            <div className="modal-content">
                <h4>Video for {orchid.name}</h4>
                <p>
                    <iframe width="100%" height="400px" src={orchid.clip} title={orchid.name} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen></iframe>
                </p>
            </div>
            <div className="modal-footer">
                <a href="" className="modal-close red-text">Close</a>
            </div>
        </div>
    </div>
  )
}