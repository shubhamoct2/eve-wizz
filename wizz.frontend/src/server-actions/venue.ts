//import Http from "@/services/http"
import axios from "@/lib/axios"
export async function saveVenue(venue) {
    console.log(venue)
    const response = await axios.post('/api/venue', venue)
}
