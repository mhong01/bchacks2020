import React from "react";
import axios from "axios";
import {
  RADAR_ROOT_URL,
  RADAR_TOKEN,
  API_GEOFENCES_URL
} from "../config/endpoint";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { PlaceModel } from "../Models/PlaceModel";
import PlaceItem from "./PlaceItem";
import Drawer from "../components/Drawer";

export default class PlacesView extends React.Component{

    private places : Array<any>;
    constructor(props:any){
        super(props);

        this.places = new Array();
        this.state = {
            post: PlaceModel,
			to: "/home"
        }
    }

    getAllGeofences(){
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: RADAR_TOKEN
        };
      
        
        axios
        .get(API_GEOFENCES_URL, {})
        .then(res => {
            console.log("res", res);
            
            console.log("res data", res.data);
            console.log("res data", res.data.geofences);
            let dataList = res.data.geofences;
            dataList.forEach((element: { description: string; tag: string; }) => {
                let placeModel:PlaceModel = new PlaceModel();
                placeModel.description = element.description;
                placeModel.tag = element.tag;
                this.places.push(placeModel);
            });
            // return result;
        })
        .catch(err => {
            console.log("ERR: " + err);
            return err;
        });
        // console.log(result);
        // return result;
    }

    componentDidMount(){
        // this.places = this.getAllGeofences();
        this.getAllGeofences();
        console.log(this.places);
    }

    componentWillMount(){
        // this.getAllGeofences();
        // // this.places = this.getAllGeofences();
        // console.log(this.places);
    }

    render(){
        return(
            <div>
                <Drawer></Drawer>
                {this.places != null ? <Grid>{this.places.map(place => (
                    <Grid item xs={6}>{place.description}</Grid>
                ))}</Grid> : <p>There is no update right now</p>}
                
            </div>
        );
    }
}