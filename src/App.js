import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PicturePage from './pages/Picture';
import NavigationPage from './pages/Navigation';
import BackgroundWaves from 'icons/BackgroundWaves';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <span className="navbar-item">
                <i className="material-icons">face</i> <span className="user-name"> Isaias Valle </span>
              </span>
            </div>
            <div className="navbar-item item-end">
              <Link to="/">
                <span className="icon exit">
                  <i className="material-icons">exit_to_app</i>
                </span>  
              </Link>
            </div>
          </nav>
          <section className="hero is-fullheight">
            {/* <!-- Hero content: will be in the middle --> */}
            <div className="hero-body">
              <div className="container has-text-centered">
                <Route exact path="/" component={LoginPage}></Route>
                <Route path="/home" component={HomePage}></Route>
                <Route path="/picture" component={PicturePage}></Route>
                <Route path="/navigate" component={NavigationPage}></Route>
              </div>
            </div>
          </section>

          {/* <div className="background-fixed">
            <BackgroundWaves/>
          </div> */}
        </div>
      </Router>
    )

  }
}

export default App;
