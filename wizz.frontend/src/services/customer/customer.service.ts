import CoreApi from "@/lib/core/api.core";
import ENDPOINTS from "@/lib/core/endpoints";
const API_ENDPOINTS = ENDPOINTS;
class Customer extends CoreApi {
    constructor(url: string | null) {
        super(url);
    }

    // get all active customers

    async getAllCustomers() {
        
    }

}

export const CustomerService = new Customer("auth");
