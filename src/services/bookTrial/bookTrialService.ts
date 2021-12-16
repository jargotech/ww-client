import axios from "axios";
import { APIURL } from "../../config/apiConfig";
import { xAccessToken } from "../../utils/getAccessToken";

export class BookTrialService {
    bookTrialService(payload: any) {
        if(xAccessToken){
            axios.defaults.headers.common['x-access-token'] = xAccessToken();
        }
        return axios.post(`${APIURL}/trial`, payload)
    }
}