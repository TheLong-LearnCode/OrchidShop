import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
  render() {
    return (
      <footer className="text-light py-4" style={{ backgroundColor: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(189,189,89,1) 75%, rgba(253,187,45,1) 100%)' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>We are a company dedicated to providing the best product for your passion.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-light">Home</Link></li>
                <li><Link to="/about" className="text-light">About us</Link></li>
                <li><Link to="/news" className="text-light">News</Link></li>
                <li><Link to="/contact" className="text-light">Contact</Link></li>
                <li><Link to="/natural" className="text-light">Special</Link></li>

              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Email: anhyeuem@example.com</p>
              <p>Phone: 0708946445</p>
            </div>
          </div>
          <div className="text-center pt-3">
            <p>&copy; 2024 Orchid Company. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
}
