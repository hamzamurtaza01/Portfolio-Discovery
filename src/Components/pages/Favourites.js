import React, { Fragment } from 'react';
// import Search from '../Users/Search';
import FavouriteUsers from '../Favourites/FavouriteUsers';


const Favourites = ({ users }) => (

    <Fragment>
        <h1>Favourites</h1>
        {/* <Search /> */}
        <FavouriteUsers users={users} />
    </Fragment>
)

export default Favourites;