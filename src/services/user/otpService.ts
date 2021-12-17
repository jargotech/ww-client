import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class OtpService{
    generateOtp(payload: any){
        return axios.post(`${APIURL}/otp`, payload)
    }

    verifyOtp(payload: any){
        return axios.post(`${APIURL}/otp/verifyOtp`, payload)
    }
}