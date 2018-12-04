import React, { Component } from 'react';
import {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import CurrentLocation from './Map';
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
      showingInfoWindow: true
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
        var offensiveIcon = {
            url: "https://visualpharm.com/assets/302/Marker-595b40b85ba036ed117dd839.svg", // url
            scaledSize: new this.props.google.maps.Size(90, 42), // scaled size
          };
          var nudgeIcon = {
            url: "https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg", // url
            scaledSize: new this.props.google.maps.Size(90, 42), // scaled size
          };
          var persuasiveIcon = {
            url: "https://visualpharm.com/assets/104/Marker-595b40b65ba036ed117d2f70.svg", // url
            scaledSize: new this.props.google.maps.Size(90, 42), // scaled size
          };
          var userIcon = {
            url: "https://visualpharm.com/assets/415/User%20Location-595b40b75ba036ed117d6da8.svg", // url
            scaledSize: new this.props.google.maps.Size(90, 42), // scaled size
          };
        return (
            <CurrentLocation
                    centerAroundCurrentLocation
                    google={this.props.google}
                >
                    <Marker position = {{lat: 14.088314, lng:-87.183402}} onClick={this.onMarkerClick} icon={offensiveIcon} name={'Offensive'} />
                    <Marker position = {{lat: 14.105734, lng:-87.204687}} onClick={this.onMarkerClick} icon={nudgeIcon} name={'Nudge'} />
                    <Marker position = {{lat: 14.061615, lng:-87.218085}} onClick={this.onMarkerClick} icon={persuasiveIcon} name={'Persuasive'} />
                    <Marker onClick={this.onMarkerClick} icon={userIcon} name={'current location'} />
                    <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                    >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                    </InfoWindow>
            </CurrentLocation>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC_jS2mk0Irr2GhR_2_kA6bHma0CUd-OzE'
  })(NavigationPage);