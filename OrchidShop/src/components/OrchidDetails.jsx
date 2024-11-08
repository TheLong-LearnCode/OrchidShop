import React, { Component, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ModalCase from './ModalCase';
import { ThemeContext } from './ThemeContext';
import { Rate } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';


export default function OrchidDetails() {
    const [orchid, setOrchid] = useState({})
    const { theme } = useContext(ThemeContext)
    const { user } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams()
    const [userRating, setUserRating] = useState(0)
    const [comment, setComment] = useState('')
    const [hasUserFeedback, setHasUserFeedback] = useState(false)

    const fetchAPI = () => {
        fetch(`https://67178885b910c6a6e028bc88.mockapi.io/orchids/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setOrchid(data)
                if (user && data.feedback) {
                    setHasUserFeedback(data.feedback.some(fb => fb.author === user.email))
                }
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchAPI()
    }, [id, user])

    const handleSubmitFeedback = async (e) => {
        e.preventDefault()
        if (!user) {
            toast.error('Please login to submit feedback')
            return
        }

        if (hasUserFeedback) {
            toast.error('You have already submitted feedback for this orchid')
            return
        }

        const newFeedback = {
            author: user.email,
            rating: userRating,
            comment: comment,
            date: new Date().toLocaleDateString()
        }

        const updatedFeedbacks = [...(orchid.feedback || []), newFeedback]

        try {
            const response = await fetch(`https://67178885b910c6a6e028bc88.mockapi.io/orchids/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...orchid,
                    feedback: updatedFeedbacks
                })
            })

            if (response.ok) {
                toast.success('Feedback submitted successfully!')
                setComment('')
                setUserRating(0)
                fetchAPI()
            } else {
                throw new Error('Failed to submit feedback')
            }
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to submit feedback')
        }
    }

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

            <div className="row mt-4" style={{color: theme.color}}>
                <h2>Feedbacks</h2>
                
                {user && !hasUserFeedback && (
                    <div className="card mb-4 p-3">
                        <h4>Submit Your Feedback</h4>
                        <form onSubmit={handleSubmitFeedback}>
                            <div className="mb-3">
                                <Rate 
                                    value={userRating} 
                                    onChange={setUserRating}
                                    tooltips={['Very bad', 'Bad', 'Okay', 'Good', 'Very good']}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Comment</label>
                                <textarea 
                                    className="form-control"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    rows="3"
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                )}

                {orchid.feedback?.map((fb) => (
                    <div key={fb.author} className="card mb-3">
                        <div className="card-body text-start">
                            <h4 className="card-title">{fb.author}</h4>
                            <Rate disabled value={fb.rating} />
                            <p className="card-text">{fb.comment}</p>
                            <p className="card-text text-muted"><small>{fb.date}</small></p>
                        </div>
                    </div>
                ))}

                {(!orchid.feedback || orchid.feedback.length === 0) && (
                    <p>No feedbacks yet.</p>
                )}
            </div>

            {isOpen && <ModalCase setIsOpen={setIsOpen} orchid={orchid} />}

        </div>
    )
}
