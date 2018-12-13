import React from 'react';
import { GoogleApiWrapper, Map, Marker, InfoWindow} from 'google-maps-react';

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        window.CurrentLocation = this;
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            selectedPlace: {},
            activeMarker: null,
            showInfoWindow: false,
        };

        //bindings
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);

    }


    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
    }  
    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showInfoWindow: true
        });
        this.props.onMarkerClick(props, marker);
    }
    onClose() {
        this.setState({
            showInfoWindow: false,
            activeMarker: null
        });
    }
    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
        const initialCenter = {
            lat: 14.048119,
            lng: -87.174323
        };
        const markers = this.props.markers.map((marker, idx)=>{
            const icon = {
                url: marker.url,
                scaledSize: new this.props.google.maps.Size(...marker.scaledSize)
            }
            return (
                <Marker 
                    key={idx}
                    position={marker.position || this.state.currentLocation}
                    icon={icon}
                    name={marker.type}
                    onClick={this.onMarkerClick}
                    id={marker.id}
                ></Marker>
            )}
        ) 
        return (
            <Map
                google={this.props.google}
                containerStyle={{height:'initial',width:'initial'}}
                className="google-map"
                centerAroundCurrentLocation
                initialCenter={initialCenter}
                zoom={14}
            >
                {markers}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
       );
    }
}
CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 14.048119,
        lng: -87.174323
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyC_jS2mk0Irr2GhR_2_kA6bHma0CUd-OzE',
    LoadingContainer: (props) => (
        <div>Loading map...</div>
      )
})(CurrentLocation);


