import HttpRequest from "../Requests";
export default class GeofencesControllers {
    private request: HttpRequest = new HttpRequest();

    async getGeofences (){
        await this.request.getData("geofences");
    }
}