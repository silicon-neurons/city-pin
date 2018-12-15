import React, { Component } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import MapMarkerIcon from 'icons/MapMarker';

class LoginPage extends Component {
    render(){
        return(
            <div className="has-text-centered">
                <MapMarkerIcon/>
                <h1 className="city-title">
                    City Pin
                </h1>
                <div className="buttons-container">
                    <Link to="/home">
                        <span onClick={this.props.login} className="button city-button is-primary">
                            <i className="material-icons">account_circle</i>
                            Sign in with Google
                        </span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default LoginPage;