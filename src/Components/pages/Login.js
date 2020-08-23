import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
// import * as routes from '../../constants/routes';
// import { history } from 'history'
import { auth, db } from '../../firebase/firebase';
// import { updateUserInfo } from '../../redux/UserInfo/UserInfoActions';
// import { updateUser } from '../../redux/Auth/AuthActions';
// import { connect } from 'react-redux';
// import { browserHistory } from 'react-router';



const Login = (props) =>
    <div style={{marginLeft: 250, marginRight: 250}}>
        <SignInForm {...props} />
    </div>

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = (e) => {
        e.preventDefault();
        console.log(this.props)
        const { email, password } = this.state;
        const { history } = this.props;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((users) => {
                console.log("Mai login hogyaa hoon bhai")
                this.setState({ user: users })

                const id = users.user.uid;
                console.log("Sign In successful. Welcome!" + id);
                // this.props.updateUser(users);

                // history.push(routes.LIST_OF_CLASSES);
                history.push('/home');

                return id;
            })
            .then(async (UserID) => {
                await this.GetUserInfo(UserID);
                localStorage.setItem('userid', UserID)
                this.props.setuserid(UserID);
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: error });
            });
    }

    GetUserInfo = (UserID) => {  // Get user info from DB and save in REDUX state 
        db.ref(`Users`).once('value', (user) => {
            const userinfo = user.val();
            console.log('userinfo', userinfo);
            return userinfo;
        })
            .then((userinfo) => {
                // this.props.updateUserInfo(userinfo);
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <div className='form-container'>
                <h1>
                    Account <span className='text-primary'>Login</span>
                </h1>
                <form onSubmit={this.login}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <input
                        type='submit'
                        value='Login'
                        className='btn btn-primary btn-block'
                    />
                </form>
            </div>
        );
    }
}


// const mapStateToProps = (state) => {
//     return {
//         user: state.authReducers.user,
//         UserInfo: state.UserInfoReducers.info
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (user) => dispatch(updateUser(user)),
//         updateUserInfo: (userinfo) => dispatch(updateUserInfo(userinfo))
//     }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
export default Login;

export { SignInForm };