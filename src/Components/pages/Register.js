import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import * as routes from '../../constants/routes';
import firebase, { db } from '../../firebase/firebase';
// import { updateUserInfo } from '../../redux/UserInfo/UserInfoActions';
// import { updateUser } from '../../redux/Auth/AuthActions';
// import { connect } from 'react-redux';


const database = firebase.database();
let id;

const Register = (props) =>
    <div style={{marginLeft: 250, marginRight: 250}}>
        <h3>Create Free Account</h3>
        <br />
        <SignUpForm {...props} />
    </div>


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: null
        };

        this.SignUp = this.SignUp.bind(this);
    }

    SignUp = (e) => {
        e.preventDefault();
        const { username, email, passwordOne } = this.state;
        const { history } = this.props;

        firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
            .then(users => {
                this.setState({ user: users });
                id = users.user.uid;
                console.log("Sign Up successful. Welcome!" + id);
                return users;
            })
            .then((users) => {

                // add user to the Users list
                const newUsersRef = database.ref('Users');
                console.log(newUsersRef)
                newUsersRef.child(id).set({
                    username: username,
                    email: email,
                    userid: id
                })

                // // add user to the relevant subject list
                // const newSubjectRef = database.ref(`Subject/${subject}`);
                // newSubjectRef.child(id).set({
                //     username: username // giving email here would save us from the duplication..NO, PUSH() will solve the problem
                // })

                // // add user to the relevant interest-area list
                // const newInterestRef = database.ref(`Interest Area/${interest}`);
                // newInterestRef.child(id).set({
                //     username: username
                // })

                console.log("Sign Up successful. Account created!");
                // this.props.updateUser(users);
                // history.push(routes.LIST_OF_CLASSES);
                return id;
            })
            .then(async (UserID) => {
                await this.GetUserInfo(UserID);
                this.props.setuserid(UserID);
                history.push('/home');
            })
            .catch(error => {
                console.log(error);
                this.setState({error: error});
            });
        e.preventDefault();
    }

    GetUserInfo = (UserID) => {  // Get user info from DB and save in REDUX state 
        db.ref(`Users/${UserID}`).once('value', (user) => {
            const userinfo = user.val();
            console.log('userinfo', userinfo);
            return userinfo;
        })
            .then((userinfo) => {
                // this.props.updateUserInfo(userinfo);
                localStorage.setItem('userinfo', userinfo)
            })
    }

    onChange = e => this.setState({  [e.target.name]: e.target.value });

    render() {
        const { Interest, phoneNumber, Subject, username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '' || Subject === '' || Interest === '' || phoneNumber === '';
        return (
            <div className='form-container'>
                <h1>
                    Account <span className='text-primary'>Register</span>
                </h1>
                <form onSubmit={this.SignUp}>
                    <div className='form-group'>
                        <label htmlFor='username'>Name</label>
                        <input
                            id='username'
                            type='text'
                            name='username'
                            value={username}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email Address</label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            value={email}
                            onChange={this.onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='passwordOne'>Password</label>
                        <input
                            id='passwordOne'
                            type='password'
                            name='passwordOne'
                            value={passwordOne}
                            onChange={this.onChange}
                            required
                            minLength='6'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='passwordTwo'>Confirm Password</label>
                        <input
                            id='passwordTwo'
                            type='password'
                            name='passwordTwo'
                            value={passwordTwo}
                            onChange={this.onChange}
                            required
                            minLength='6'
                        />
                    </div>
                    <input
                        type='submit'
                        value='Register'
                        className='btn btn-primary btn-block'
                    />
                </form>
            </div>
        );
    }
}

// const SignUpLink = () =>
//     <p>
//         Don't have an account?
//         {''}<br />
//         <Link to={routes.SIGN_UP}>Sign Up</Link>
//     </p>




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

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
export default Register;

export { SignUpForm };
