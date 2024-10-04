import React, { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container" style={{ marginTop: '108px' }}>
      <h2 className="text-center">Contact Us</h2>
      {submitted && <div className="alert alert-success">Your message has been sent successfully!</div>}
      <div className="row mt-4">

        <div className="contact-info col-md-5">
          <div className='text-start' style={{fontWeight:'500'}}>
            <p>FLOWER SHOP ROMA</p>
            <p>Address: 456/48 Cao Thắng, Quận 10, Hồ Chí Minh, Vietnam</p>
            <p>Hotline: 0708946445</p>
          </div>


          <form className="contact-form" onSubmit={handleSubmit} >
            <div className="form-group text-start">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" className="form-control" required />
            </div>
            <div className="form-group text-start">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>
            <div className="form-group text-start">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" className="form-control" required></textarea>
            </div>
            <button type="submit" className="btn" style={{ background: 'linear-gradient(90deg, rgba(253,29,29,1) 73%, rgba(252,176,69,1) 100%)', color: 'white' }}>Send Message</button>
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