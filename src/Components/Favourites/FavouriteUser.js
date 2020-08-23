import React, { Fragment, useState, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import githubContext from '../../context/github/githubContext';

const FavouriteUser = ({ match, users, getAllFavouritesByUser }) => {
    const GithubContext = useContext(githubContext);

    const { user, loading, getUser, repos, getUserRepos } = GithubContext;

    const [UserisFavourite, setUserisFavourite] = useState({ fav: false, favID: undefined })

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        console.log({ users })
        users && users.length && users.forEach(FavUser => {
            // console.log(FavUser.id, user.id)
            // console.log(FavUser)
            FavUser.user.id === user.id ? setUserisFavourite({ fav: true, favID: FavUser.favouriteID }) : setUserisFavourite({ fav: false, favID: FavUser.favouriteID });
        })
        // eslint-disable-next-line
    }, [])

    const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;


    const addToFavs = () => {
        // add user to the Favourites list
        const newUsersRef = db.ref('Favourites');
        // console.log(newUsersRef)
        const userID = localStorage.getItem('userid')

        const favouriteID = newUsersRef.child(userID).push().key;
        newUsersRef.child(userID).child(favouriteID).set({
            user,
            favouriteID
        })
            .then(() => {
                getAllFavouritesByUser();
                setUserisFavourite({ fav: true, favID: favouriteID })
            })
    }

    const removeFromFavs = () => {
        // remove user from the Favourites list
        const newUsersRef = db.ref('Favourites');
        // console.log(newUsersRef)
        const userID = localStorage.getItem('userid')

        // const favouriteID = newUsersRef.child(userID).push().key;
        newUsersRef.child(userID).child(UserisFavourite.favID).remove()
            .then(() => {
                console.log('Item removed rom fav')
                getAllFavouritesByUser();
                setUserisFavourite({ fav: false, favID: undefined })
            })

    }


    // if (loading) return <Spinner />;

    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div><Link to='/favourites' className='btn btn-light'>
                    Back to favourites
                </Link>
            Hireable: {' '}
                    {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}</div>
                <button className='btn btn-success' onClick={!UserisFavourite.fav ? addToFavs : removeFromFavs}>
                    {!UserisFavourite.fav ? 'Add to Favourite' : 'Remove from Favourite'}
                </button>
            </div>
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>

                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>

                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos} />
        </Fragment>
    )
}

export default FavouriteUser
