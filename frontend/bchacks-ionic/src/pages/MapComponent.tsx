import React,  { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as parkData from "../parkData.json";

export default class MapComponent extends React.Component<any, any> {

    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          icon={{
            url: `/skateboarding.svg`,
            // scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}
    </GoogleMap>
          );
    }
  
}