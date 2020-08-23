import React, { Component } from 'react';
import FavouriteUserItem from './FavouriteUserItem'
// import { db } from '../../firebase/firebase';

class FavouriteUsers extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         users: []
    //     };
    // }

    // componentDidMount() {
        // this.getAllFavouritesByUser()
    // }

    // getAllFavouritesByUser = async () => {
    //     const { users } = this.state;
    //     const myID = localStorage.getItem('userid')
    //     await db.ref(`Favourites`).child(myID).once('value', (user) => {
    //         const userinfo = user.val();
    //         let userKeys = Object.keys(userinfo)
    //         let userValues = Object.values(userinfo)
    //         console.log(userKeys, userValues)
    //         userKeys && userKeys.forEach((key, index) =>
    //             this.setState({users: [...this.state.users, userValues[index].user]})
    //         )
    //     })
    //     console.log(this.state.users)
    // }

    render() {
        const { users } = this.props;
        return (
            <div style={userStyle}>
                {users && users.length > 0 &&
                    users.map(USER =>
                        <FavouriteUserItem key={USER.user.id} user={USER.user} />
                    )}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,32%)',
    gridGap: '1rem',
    marginLeft: '25px'
    // border: 'solid 3px red'
}

export default FavouriteUsers
