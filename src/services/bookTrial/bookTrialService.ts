import axios from "axios";
import { APIURL } from "../../config/apiConfig";
import axiosInstance from "../../utils/axiosInstance";
import { userJwtData, xAccessToken } from "../../utils/getAccessToken";

export class BookTrialService {
  bookTrialService(payload: any) {
    return axiosInstance.post(`/trial`, payload);
  }

  getTrailByUserId(payload: any) {
    return axiosInstance.get(`/trial/findByUserId/${payload}`);
  }
}
