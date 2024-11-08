import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from './ThemeContext';

export default function Footer() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  return (
    <footer className="text-light py-4" style={{ backgroundColor: theme.backgroundColor, border: '2px solid'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-4" style={{color: theme.color}}>
              <h5>About Us</h5>
              <p>We are a company dedicated to providing the best product for your passion.</p>
            </div>
            <div className="col-md-4" style={{color: theme.color}}>
              <h5>Quick Links</h5>
              <ul className="list-unstyled ">
                <li><Link to="/" style={{color: theme.color}}>Home</Link></li>
                <li><Link to="/about" style={{color: theme.color}}>About us</Link></li>
                <li><Link to="/news" style={{color: theme.color}}>News</Link></li>
                <li><Link to="/contact" style={{color: theme.color}}>Contact</Link></li>
                <li><Link to="/natural" style={{color: theme.color}}>Special</Link></li>

              </ul>
            </div>
            <div className="col-md-4" style={{color: theme.color}}>
              <h5>Contact</h5>
              <p>Email: anhyeuem@example.com</p>
              <p>Phone: 0708946445</p>
            </div>
          </div>
          <div className="text-center pt-3" style={{color: theme.color}}>
            <p>&copy; 2024 Orchid Company. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
  )
}
