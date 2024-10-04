import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const { theme, toggle, dark } = useContext(ThemeContext)

    return (
        <div>
            <header className='sticky-header fixed-top' style={{boxShadow: '10px 10px 15px 5px rgba(0, 0, 0, 0.5)'}}>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: theme.color }} to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: theme.color }} to="/about">About us</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: theme.color }} to="/news">News</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: theme.color }} to="/contact">Contact</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" style={{ color: theme.color }} to="/natural">Speacial</Link>
                            </li>
                        </ul>

                    </div>

                    <div style={{ position: 'relative' }}>
                        <a className='switch-mode' href='#' onClick={toggle}
                            style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none',
                                textDecoration: 'none'
                            }} data-testid="toggle-theme-btn"
                        >
                            Switch to {!dark ? 'Dark' : 'Light'} mode
                        </a>
                    </div>


                </nav>
            </header>
        </div>
    )
}
