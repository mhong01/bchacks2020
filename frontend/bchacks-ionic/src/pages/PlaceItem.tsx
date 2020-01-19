import React from "react";
import { PlaceModel } from "../Models/PlaceModel";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default class PlaceItem extends React.Component{
    
    static propTypes:{
        Place: PlaceModel;
    }

    private place : PlaceModel = new PlaceModel();
    constructor(props:any){
        super(props);
        if (props.Place == undefined && props.Place == null){
            console.log("Props null");
            return;
        }
        this.place = props.Place;
        console.log(this.place);
    }

    render(){
        let color = 'green';
        var styles = {
            safeBkgrn: {
                BackgroundColor: '#00CC00',
            }, 
            unsafeBkgrn: {
                BackgroundColor: '#CC0000',
            }
        }
        return(
            <div>
                {this.place.tag == 'safe'? <ListItem >
                <ListItemText primary={this.place.description}></ListItemText>
            </ListItem> : <ListItem  >
                <ListItemText primary={this.place.description}></ListItemText>
            </ListItem>}
            
            </div>
        );
    }
}