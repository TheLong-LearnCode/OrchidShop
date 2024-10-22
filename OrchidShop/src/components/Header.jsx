import { useContext, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'

export default function Header() {
    const { theme, toggle, dark } = useContext(ThemeContext)
    const [isNavCollapsed, setIsNavCollapsed] = useState(true)
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)
    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <header className='sticky-header fixed-top' style={{ boxShadow: '10px 10px 15px 5px rgba(0, 0, 0, 0.2)' }}>
                <nav className="navbar navbar-expand-lg" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={!isNavCollapsed ? true : false}
                        aria-label="Toggle navigation"
                        onClick={handleNavCollapse}
                    >
                        <span className="navbar-toggler-icon" style={{ color: theme.color }}></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
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

                    <div style={{ marginRight: '20px', marginLeft: '20px' }}>
                        <a className='switch-mode' href='#' onClick={toggle}
                            style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none',
                                textDecoration: 'none'
                            }} data-testid="toggle-theme-btn"
                        >
                            {!dark ? <i class="bi bi-moon-stars-fill text-dark"></i> : <i class="bi bi-brightness-high-fill text-light"></i>}
                        </a>
                    </div>

                    <div style={{ marginRight: '20px' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                <i class="bi bi-person-rolodex"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {localStorage.getItem('email') ?
                                    <>
                                        <Dropdown.Item className='text-center' onClick={handleLogout}>Log out</Dropdown.Item>
                                        <Dropdown.Item className='text-center'><Link style={{ textDecoration: 'none', color: 'black' }} to={'/dashboard'}>Dashboard</Link></Dropdown.Item>
                                    </>
                                    :
                                    <Dropdown.Item className='text-center'><Link style={{ textDecoration: 'none', color: 'black' }} to={'/login'}>Login</Link></Dropdown.Item>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </header>
        </div>
    )
}
