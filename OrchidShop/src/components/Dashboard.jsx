import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { theme } = useContext(ThemeContext)
    const [orchids, setOrchids] = useState([]);
    const [show, setShow] = useState(false);
    const [editingOrchid, setEditingOrchid] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('email')){
            navigate('/login')
        }
    })

    const handleClose = () => {
        setShow(false)
        setEditingOrchid(null)
        formik.resetForm()
    }
    const handleShow = () => setShow(true);

    const baseurl = 'https://67178885b910c6a6e028bc88.mockapi.io/orchids';

    const fetchOrchids = () => {
        fetch(baseurl)
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => b.id - a.id);
                setOrchids(sortedData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetchOrchids();
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            rating: 0,
            image: '',
            category: '',
            color: '',
            origin: '',
            clip: '',
            isSpecial: false,
        },
        onSubmit: values => {
            if (editingOrchid) {
                fetch(`${baseurl}/${editingOrchid.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                })
                    .then(() => {
                        handleClose()
                        fetchOrchids()
                    })
            } else {
                // Add new orchid
                fetch(baseurl, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                })
                    .then(() => {
                        handleClose()
                        fetchOrchids()
                    })
            }
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            category: Yup.string().required("Required.").min(3, "Must be 3 characters or more"),
            image: Yup.string().required("Required.").min(8, "Must be 8 characters or more"),
            color: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            origin: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            clip: Yup.string().required("Required.").min(8, "Must be 8 characters or more"),
        })
    })


    const handleDelete = (id) => {
        fetch(`${baseurl}/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchOrchids()
            })
            .catch(err => console.error(err))
    }

    const handleEdit = (orchid) => {
        setEditingOrchid(orchid)
        formik.setValues({
            name: orchid.name,
            rating: orchid.rating,
            image: orchid.image,
            category: orchid.category,
            color: orchid.color,
            origin: orchid.origin,
            clip: orchid.clip,
            isSpecial: orchid.isSpecial,
        })
        handleShow()
    }


    return (
        <div className="container mt-5" style={{ paddingTop: '100px', minHeight: '420px' }}>
            <h1 className="text-center" style={{ color: theme.color }}>Dashboard</h1>
            <div className='d-flex justify-content-end mb-3'>
                <button className="btn btn-success" onClick={handleShow}>Add Orchid</button>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Img</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Name</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Natural</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Category</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Highly Rate</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Color</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Origin</th>
                        <th style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orchids.map((orchid) => (
                        <tr key={orchid.id}>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}><img src={orchid.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.name}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.isSpecial ? <i className="bi bi-tree-fill text-success"></i> : <i className="bi bi-tree-fill text-danger"></i>}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.category}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.rating > 4 && <i className="bi bi-stars text-warning"></i>}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.color}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>{orchid.origin}</td>
                            <td className="text-center align-middle" style={{ color: theme.color, backgroundColor: theme.backgroundColor }}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                        <i class="bi bi-x-diamond-fill"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item className='text-center' onClick={() => handleEdit(orchid)}>Update</Dropdown.Item>
                                        <Dropdown.Item className='text-center'
                                            onClick={() => { if (confirm('Do u wanna delete?')) handleDelete(orchid.id) }}
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingOrchid ? 'Edit orchid' : 'Add new orchid'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's name"
                                name='name' value={formik.values.name} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's image"
                                name='image' value={formik.values.image} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's color"
                                name='color' value={formik.values.color} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's origin"
                                name='origin' value={formik.values.origin} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's category"
                                name='category' value={formik.values.category} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Clip</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Orchid's clip"
                                name='clip' value={formik.values.clip} onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Natural"
                                name='isSpecial' value={formik.values.isSpecial} onChange={formik.handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={formik.handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}
