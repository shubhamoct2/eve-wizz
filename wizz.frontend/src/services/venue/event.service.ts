import CoreApi from "@/lib/core/api.core";
import ENDPOINTS from "@/lib/core/endpoints";
import {showErrors} from "@/lib/utils"
const API_ENDPOINTS = ENDPOINTS;
import {toast} from "@/components/ui/use-toast"

class Event extends CoreApi {
    constructor(url: string | null) {
        super(url);
    }
    async getEventCategories(){
        await this.csrf();
        
        return await this.http
                                 .get(API_ENDPOINTS.EVENT.ALL_CATEGORIES)
                                 .then((responseData)=>{
                                    if(responseData?.status==200){
                                        return responseData?.data?.categories;
                                    }
                                 })
                				.catch(error => {
                                    console.log(error, ' errorerrorerror')
                                    return error
                                })
    }
    
    async csrf() {
        await this.http.get(ENDPOINTS.TOKEN)
    }
}
const EventService = new Event('owner')
export default EventService;
