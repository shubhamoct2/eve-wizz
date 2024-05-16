import CoreApi from "@/lib/core/api.core";
import ENDPOINTS from "@/lib/core/endpoints";

const API_ENDPOINTS = ENDPOINTS;

class Venue extends CoreApi {
    constructor(url: string | null) {
        super(url);
    }

    /**
     * Save Venue
     */

    async storeVenue(data: any) {
        await this.csrf();
        return await this.http
            .post(API_ENDPOINTS.VENUE.STORE, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response, ' ---VENUE RESPONSE')
            })
    }


    async getDraftVenues() {
        await this.csrf();
        return await this.http
            .get(API_ENDPOINTS.VENUE.DRAFTS)
            .then((response) => {
                return response?.data
            })
            .catch(error => {
                return error
            })
    }

    async csrf() {
        await this.http.get(ENDPOINTS.TOKEN)
    }
}

const VenueService = new Venue('owner')
export default VenueService;
