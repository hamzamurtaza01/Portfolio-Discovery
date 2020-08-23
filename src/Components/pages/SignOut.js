import React from 'react';
import firebase from '../../firebase/firebase';
// import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from 'reactstrap';
// import * as routes from '../../constants/routes';

// import { removeClassId } from '../../redux/ClassID/ClassIDActions';
// import { removeUser } from '../../redux/Auth/AuthActions';
// import { removeUserInfo } from '../../redux/UserInfo/UserInfoActions';
// import { connect } from 'react-redux';



class SignOutButton extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // user: {}
    //     }
    // }

    logout = (e) => {
        e.preventDefault();

        firebase.auth().signOut()
            // .then(() => {
            //     // Remove user and ClassId from Redux store...
            //     // this.props.removeUser();
            //     // this.props.removeClassId();
            //     // this.props.removeUserInfo();
            // })
            .then(() => {
                // this.props.logout();
                console.log('ABCDEFHJKLPOGFD')
                const { history } = this.props;

                localStorage.removeItem('userid')
                // history.push('/login');
                // console.log(document)
                // console.log(document.window)
                // console.log(window)
                window.location.replace('/')
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        // console.log("document", document)
        // console.log("document.window", document.window)
        // console.log("window", window)
        return (
            <form>
                <button
                    className='btn btn-white btn-block'
                    style={{ width: '100%' }}
                    type="submit"
                    onClick={this.logout}
                >
                    Sign Out
                </button>
            </form>
        )
    }
}

export default SignOutButton;

// const mapStateToProps = (/*state*/) => {
//     return {
//         // user: state.authReducers.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeUser: () => dispatch(removeUser()),
//         removeClassId: () => dispatch(removeClassId()),
//         removeUserInfo: () => dispatch(removeUserInfo())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SignOutButton) ;
