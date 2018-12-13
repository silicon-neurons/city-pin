import React, { Component } from 'react';
import axios from 'axios';
import CityMap from './Map';
import { browser } from 'react-router-dom';
class NavigationPage extends Component {
    state = {
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        markers: []
    };
    componentDidMount(){
        axios({
            method: 'get',
            /* url: 'http://127.0.0.1:8000/api/v1/lens/', /* LOCAL HOST*/
            url: 'https://designrecognitionbackend.herokuapp.com/api/v1/posts/?format=json', /* POSTGRES ONLINE DB */

        }).then(({ data: posts })=> {
            console.log(posts);
            const typeMap = {
                'P': {
                  type:'Persuasive',
                  url: 'https://visualpharm.com/assets/302/Marker-595b40b85ba036ed117dd839.svg',
                  scaledSize: [90, 42]
                },
                'O': {
                  type: 'Offensive',
                  url: 'https://visualpharm.com/assets/104/Marker-595b40b65ba036ed117d2f70.svg',
                  scaledSize: [90, 42]
                },
                'N': {
                  type: 'Nudge',
                  url: 'https://visualpharm.com/assets/825/Marker-595b40b75ba036ed117d9f54.svg',
                  scaledSize: [90, 42]
                }
              };
            const user =  {
                type: 'user',
                url: "https://visualpharm.com/assets/415/User%20Location-595b40b75ba036ed117d6da8.svg", // url
                scaledSize: [90, 42], // scaled size
            }
            this.setState({
                markers: [user].concat(posts.map((post) => {
                    const {geo_latitude:lat, geo_longitude:lng} = post;
                    return {
                        id: post.id,
                        position: {
                            lat,
                            lng
                        },
                        ...typeMap[post.design]
                    }
                }))
            });
        }).catch(function (error) {
            console.log(error);
        });
        
    }
    onMarkerClick = (props, marker, e) => {
        console.log(props.id);
        this.props.history.push({
            pathname: '/picture/1'
        })
    }
    render() {
        const { markers } = this.state;
        
        return (
            <CityMap
                markers={markers}
                onMarkerClick= {this.onMarkerClick}
            >
            </CityMap>
        )
    }
}

export default NavigationPage