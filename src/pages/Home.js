import React, { Component } from 'react';
import './Home.css'
import { Link } from 'react-router-dom';
import MapMarkerIcon from 'icons/MapMarker';

class HomePage extends Component {
    render(){
        return(
            <div class="has-text-centered">
                <MapMarkerIcon/>
                <h1 class="city-title">
                    City Pin
                </h1>
                <div class="buttons-container">
                    <Link to="/picture">
                        <span class="button is-primary is-large is-fullwidth">
                            New Picture 
                        </span>
                    </Link>
                    <Link to="/navigate">
                        <span class="button is-primary is-large is-fullwidth">
                            Navigate
                        </span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default HomePage;