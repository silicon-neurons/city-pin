import React, { Component } from 'react';
import { Marker, InfoWindow } from 'google-maps-react';
import CityMap from './Map';
class NavigationPage extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: false
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        const markers = [
            {
                type: 'offensive',
                url: "https://visualpharm.com/assets/302/Marker-595b40b85ba036ed117dd839.svg", // url
                scaledSize: [90, 42], // scaled size
                position: {
                    lat: 14.088314,
                    lng: -87.183402
                }
            },{
                type: 'persuasive',
                url: "https://visualpharm.com/assets/104/Marker-595b40b65ba036ed117d2f70.svg", // url
                scaledSize: [90, 42], // scaled size
                position: {
                    lat: 14.061615,
                    lng: -87.218085
                }
            },{
                type: 'user',
                url: "https://visualpharm.com/assets/415/User%20Location-595b40b75ba036ed117d6da8.svg", // url
                scaledSize: [90, 42], // scaled size
            },{
                type: 'nudge',
                url: "https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg", // url
                scaledSize: [90, 42], // scaled size
                position: {
                    lat: 14.105734, lng: -87.204687
                }
            }

        ]
        return (
            <CityMap
                markers={markers}
            >
                
                {/* <Marker position={{ lat: 14.088314, lng: -87.183402 }} onClick={this.onMarkerClick} icon={offensiveIcon} name={'Offensive'} />
                <Marker position={{ lat: 14.105734, lng: -87.204687 }} onClick={this.onMarkerClick} icon={nudgeIcon} name={'Nudge'} />
                <Marker position={{ lat: 14.061615, lng: -87.218085 }} onClick={this.onMarkerClick} icon={persuasiveIcon} name={'Persuasive'} />
                <Marker onClick={this.onMarkerClick} icon={userIcon} name={'current location'} /> */}
                
            </CityMap>
        )
    }
}

export default NavigationPage