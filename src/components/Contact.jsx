import React, { useContext, useState } from 'react'
import { ThemeContext } from './ThemeContext';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Alert, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { theme } = useContext(ThemeContext)

  const formik = useFormik({
    initialValues:{
        email: '',
        name: '',
        phone: 0,
        message: '',
    },
    onSubmit:  values=>{
        alert(JSON.stringify(values));
        setSubmitted(true);
     },
     validationSchema: Yup.object({
        name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
        email: Yup.string().required("Required.").email("Invalid email"),
        phone: Yup.number().integer().typeError("Please enter a valid number"),
        message: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
    }),


})


  return (
    <div className="container" style={{ paddingTop: '100px', color: theme.color}}>
      <h2 className="text-center">Contact Us</h2>
      {submitted && <div className="alert alert-success">Your message has been sent successfully!</div>}
      <div className="row mt-4">

        <div className="contact-info col-md-5">
          <div className='text-start' style={{fontWeight:'500'}}>
            <p>FLOWER SHOP ROMA</p>
            <p>Address: 456/48 Cao Thắng, Quận 10, Hồ Chí Minh, Vietnam</p>
            <p>Hotline: 0708946445</p>
          </div>


          <form onSubmit={formik.handleSubmit} className='text-start'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Your email..."
                    name='email' value={formik.values.email} onChange={formik.handleChange}
                    />
                    {formik.errors.email && (<Alert variant='warning'>{formik.errors.email}</Alert>)}
                </Form.Group>
                <Form.Group>
                <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Your name..."
                    name='name' value={formik.values.name}  onChange={formik.handleChange}
                    />
             {formik.errors.name && (<Alert variant='warning'>{formik.errors.name}</Alert>)}

                </Form.Group>
                <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Your phone..."
                    name='phone' value={formik.values.phone} onChange={formik.handleChange}
                    />
                    {formik.errors.phone && (<Alert variant='warning'>{formik.errors.phone}</Alert>)}
                </Form.Group>
                <Form.Group className='mb-3'>
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} name='message'
                value={formik.values.message} onChange={formik.handleChange}
                />
                {formik.errors.message && (<Alert variant='warning'>{formik.errors.message}</Alert>)}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Button variant='dark' type='submit'>Submit</Button>
                </Form.Group>
                </form>

        </div>

        <div className="map col-md-7">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.688264711973!2d106.65148114451952!3d10.77895050865756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f33e854382b%3A0xc59597beed9d830f!2sFLOWER%20SHOP%20ROMA!5e0!3m2!1sen!2s!4v1727852573342!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>
      </div>



    </div>
  )
}