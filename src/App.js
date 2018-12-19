import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link, Switch } from 'react-router-dom';


import './App.css';

import HomePage from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import NewPicturePage from './pages/Picture/NewPicture';
import ViewPicturePage from './pages/Picture/ViewPicture';
import NavigationPage from './pages/Navigation/Navigation';
import NavBar from 'components/NavBar';

const fakeAuth = {
  isAuthenticated: true
}
function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: fakeAuth.isAuthenticated,
      latitude: 0,
      longitude: 0
    }
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      });
    }
  }
  render() {
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <div>
          <NavBar
            left={
              isAuthenticated ?
                [<i key="user-icon" className="material-icons">face</i>, <span key="name" className="user-name"> Isaias Valle </span>] :
                <i className="material-icons">face</i>
            }
            right={
              isAuthenticated ?
                <Link to="/">
                  <span onClick={() => {
                    fakeAuth.isAuthenticated = false;
                    this.setState({ isAuthenticated: fakeAuth.isAuthenticated });
                  }} className="icon exit">
                    <i className="material-icons">exit_to_app</i>
                  </span>
                </Link> :
                null
            }
          />
          <section className="hero is-fullheight-with-navbar">
            {/* <!-- Hero content: will be in the middle --> */}

            <div className="hero-body">
              
                <PrivateRoute path="/navigate" component={NavigationPage}></PrivateRoute>
                <div className="container has-text-centered">
                <Switch>
                  <Route exact path="/(login)?"
                    component={() =>
                      <LoginPage
                        login={() => {
                          fakeAuth.isAuthenticated = true;
                          this.setState({ isAuthenticated: fakeAuth.isAuthenticated });
                        }}
                      />
                    }
                  >
                  </Route>
                  <PrivateRoute path="/home" component={HomePage}></PrivateRoute>
                  <PrivateRoute path="/picture" component={() =>
                    <NewPicturePage
                      latitude={this.state.latitude}
                      longitude={this.state.longitude}
                    />}
                  >
                  </PrivateRoute>
                  <PrivateRoute path="/viewPicture/:id" component={ViewPicturePage}></PrivateRoute>
                </Switch>
                </div>
            </div>
          </section>
        </div>
      </Router>
    )

  }
}

export default App;
