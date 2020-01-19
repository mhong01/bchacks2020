import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";
import { Component } from "react";
import {
  RADAR_ROOT_URL,
  API_TRACK_URL,
  RADAR_TOKEN,
  API_GEOFENCES_URL,
  API_SEND
} from "../config/endpoint";
import axios from "axios";
import { state } from "../state";
const style = {
  width: "100%",
  height: "60%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapClicked = this.mapClicked.bind(this);
  }

  mapClicked(mapProps, map, clickEvent) {
    console.log("Here");
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();

    console.log(lat, lng);
    // call API to track users
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: RADAR_TOKEN
    };

    const json = {
      deviceId: "C305F2DB-56DC-404F-B6C1-BC52F0B680D8",
      userId: "r09rvW7pWQY6BsjQwnbHmrsr8gh1",
      latitude: lat,
      longitude: lng,
      accuracy: 65
    };

    axios
      .post(API_TRACK_URL, json)
      .then(res => {
        const data = res.data;
        const events = data.events;
        console.log(events);
        if (events.length > 0) {
          console.log("Event", events);
          if (events[0].type == "user.entered_geofence") {
            alert("USER ENTER DANGEROUS PLACE");

            axios.get(API_SEND + "?userId=" + state.userId);
          } else {
            alert("USER EXIT DANGEROUS PLACE");
          }
        }
      })
      .catch(err => {
        console.log("ERR: " + err);
      });
  }

  render() {
    return (
      <Map
        google={this.props.google}
        style={style}
        zoom={14}
        initialCenter={{
          lat: 49.942202,
          lng: -119.395933
        }}
        onClick={this.mapClicked}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD4u_rrG73W9mjdN9g-LrSkzIE3Qm5UNEI"
})(MapContainer);
