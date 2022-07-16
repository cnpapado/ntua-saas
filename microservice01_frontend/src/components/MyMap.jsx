import React, { Component } from 'react';
import {MapContainer, GeoJSON} from "react-leaflet";
import mapData from './MyMapAssets/europe.json';

import 'leaflet/dist/leaflet.css';
import "./MyMapAssets/MyMap.css";

class MyMap extends Component {
    state = {  } ;

    countryStyle={
        fillColor:"beige",
        fillOpacity:1,
        color:"black",
        weight:2
    };
    
    onClick=(event)=>{
        event.target.setStyle({
            color:"green",
            fillColor:"blue"
        })
    };

    onMouseover=(event)=>{
        event.target.setStyle({
            color:"green",
            fillColor:"blue",
            fillOpacity:0.5
        })
    };

    onMouseout=(event)=>{
        event.target.setStyle({
            color:"black",
            fillColor:"beige",
            fillOpacity:1
        })
    };

    onEachCountry=(country,layer)=>{
        const countryName= country.properties.NAME;
        layer.bindPopup(countryName); //add data
        
        layer.on({
            click: this.onClick,
            mouseover: this.onMouseover,
            mouseout: this.onMouseout
        });
    };

    

    

    componentDidMount(){
        //console.log(mapData);
    };
    render() { 
        return (<div>
            <h1 style={{textAlign: "center"}}>Map of Europe</h1>
            <MapContainer style={{height:"80vh"}}zoom={3.5} center={[55,26]}>
                <GeoJSON style={this.countryStyle} data={mapData.features} onEachFeature={this.onEachCountry}></GeoJSON>
            </MapContainer>
            </div>);
    }
}
 
export default MyMap;