import Axios from "@/lib/core/http";

class CoreApi {
    http = Axios;

    constructor(public _base_path: string | null) {
    }

    get(url: string) {
        try {
            return this
                .http
                .get(url)
                .then((queryResponse) => {
                    return queryResponse
                })
                .catch((error) => {
                    return error
                })
        } catch (error) {
            return error;
        }
    }

    post(url: string, data: {} | [], options?: any) {
        try {
            return this
                .http
                .post(url, data)
                .then((queryResponse) => {
                    return queryResponse?.data
                })
        } catch (error) {
            return error;
        }
    }
}

export default CoreApi;
