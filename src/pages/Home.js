import React, { Component } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import MapMarkerIcon from 'icons/MapMarker';

class HomePage extends Component {
    render(){
        return(
            <div className="has-text-centered">
                <MapMarkerIcon/>
                <h1 className="city-title">
                    City Pin
                </h1>
                <div className="buttons-container">
                    <Link to="/picture">
                        <span className="button city-button button-dark is-large is-fullwidth">
                            New Picture 
                        </span>
                    </Link>
                    <Link to="/navigate">
                        <span className="button city-button button-lighty is-large is-fullwidth">
                            Navigate
                        </span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default HomePage;