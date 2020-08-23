import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/layout/Navbar';
import User from './Components/Users/User';
import Alert from './Components/layout/Alert';
import About from './Components/pages/About';
import Home from './Components/pages/Home';
import Favourites from './Components/pages/Favourites';
import NotFound from './Components/pages/NotFound';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import FavouriteUser from './Components/Favourites/FavouriteUser';
import { db } from './firebase/firebase';

import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: undefined,
      users: []
    }
  }

  componentDidMount() {
    const usrID = localStorage.getItem('userid')
    usrID && this.setState({ userid: usrID })
    this.getAllFavouritesByUser();
  }

  setuserid = (uid) => {
    this.setState({ userid: uid })
  }

  getAllFavouritesByUser = () => {
    this.setState({ users: [] }, async () => {
      // const { users } = this.state;
      const myID = localStorage.getItem('userid')
      if (myID) {
        await db.ref(`Favourites`).child(myID).once('value', (user) => {
          const userinfo = user.val();
          let userKeys = userinfo && Object.keys(userinfo)
          let userValues = userinfo && Object.values(userinfo)
          console.log(userKeys, userValues)
          userKeys && userKeys.forEach((key, index) =>
            this.setState({ users: [...this.state.users, userValues[index]] })
          )
        })
      }
      console.log(this.state.users)
    })
  }

  render() {
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar title="Portfolio Discovery" icon="fab fa-github" userid={this.state.userid} />

              <div className="container">
                <Alert />
                <Switch>
                  <Route exact path='/' component={(props) => <Login setuserid={this.setuserid} {...props} />} />
                  <Route exact path='/register' component={(props) => <Register setuserid={this.setuserid} {...props} />} />

                  <Route exact path='/home' component={Home} />
                  <Route exact path='/favourites' component={(props) => <Favourites users={this.state.users} {...props} />} />
                  <Route exact path='/favourite/:login' component={(props) => <FavouriteUser users={this.state.users} getAllFavouritesByUser={this.getAllFavouritesByUser} {...props} />} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/user/:login' component={(props) => <User users={this.state.users} getAllFavouritesByUser={this.getAllFavouritesByUser} {...props} />} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    );
  }
}

export default App;
