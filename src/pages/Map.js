import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper, Map} from 'google-maps-react';

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        window.CurrentLocation = this;
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.google !== this.props.google) {
        //     this.loadMap();
        // }
        // if (prevState.currentLocation !== this.state.currentLocation) {
        //     this.recenterMap();
        // }
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
        // this.loadMap();
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

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;
            const maps = google.maps; 
            const mapRef = this.refs.map;
    
            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);
    
            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
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
        return (
            <Map google={this.props.google} containerStyle={{height:'intitial',width:'intitial'}} className="google-map">
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


