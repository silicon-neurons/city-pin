import React, { Component } from 'react';
import HomePage from './pages/Home';
import PicturePage from './pages/Picture';
import NavigationPage from './pages/Navigation';
import BackgroundWaves from 'icons/BackgroundWaves';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

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

              <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span className="icon exit">
                  <i className="material-icons">exit_to_app</i>
                </span>
              </span>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <span className="navbar-item">
                  Home
                      </span>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <span className="button is-primary">
                      <strong>Sign up</strong>
                    </span>
                    <span className="button is-primary-light">
                      Log in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <section className="hero is-fullheight">
          {/* <!-- Hero content: will be in the middle --> */}
            <div className="hero-body">
              <div className="container has-text-centered">
                <Route exact path="/" component={HomePage}></Route>
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
