const URL: string = "https://api.radar.io/v1/";
export default class HttpRequests {
    private result:any ;
    async getData (path: string, id?: string){
        if (id){
            this.result = await fetch(URL + path +"/" + id);
        } else {
            this.result = await fetch(URL + path);
        }
        return this.result.json(); 
    }

    async postData (){
        
    }

}