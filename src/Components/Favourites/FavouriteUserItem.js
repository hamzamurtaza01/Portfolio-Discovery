import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const FavouriteUserItem = ({ user: { id, login, avatar_url, html_url } }) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} className="round-img" style={{ width: '60px' }} alt="" />
            <h3>{login}</h3>

            <div>
                <Link to={`/favourite/${login}`} className='btn btn-dark btn-sm my-1'>
                    More
                </Link>
            </div>
        </div>
    )
}

FavouriteUserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default FavouriteUserItem
