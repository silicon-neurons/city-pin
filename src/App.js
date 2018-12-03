import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './App.css';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import PicturePage from './pages/Picture';
import NavigationPage from './pages/Navigation';
import NavBar from 'components/NavBar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar
            left={[
              <i className="material-icons">face</i>,<span className="user-name"> Isaias Valle </span>
            ]}
            right={
              <Link to="/">
                <span className="icon exit">
                  <i className="material-icons">exit_to_app</i>
                </span>
              </Link>
            }
          />
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
