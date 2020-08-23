import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignOutButton from '../pages/SignOut';

const Navbar = (props) => {
    const { icon, title, userid } = props
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} style={{ paddingLeft: 20, paddingRight: 20 }} />
                {title}
            </h1>

            {
                !userid ?
                    <ul>
                        <li>
                            <Link to='/'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                    :
                    <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <li>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link to='/favourites'>Favourites</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <SignOutButton {...props} />
                        </li>
                    </ul>

            }

        </nav>
    )
}

Navbar.defaultProps = {
    title: 'Portfolio Discovery',
    icon: 'fab fa-github'
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
