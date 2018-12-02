import React, {Component} from 'react';

class MapMarker extends Component{
    render(){
        return (
            <svg width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35 0C54.3 0 70 15.7 70 35C70 61.25 35 100 35 100C35 100 0 61.25 0 35C0 15.7 15.7 0 35 0ZM27.35 60L60 27.05L53 20L27.35 45.9L17 35.45L10 42.5L27.35 60Z" fill="#31C4CD"/>
            </svg>
        )
    }
}

export default MapMarker;