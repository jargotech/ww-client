import axios from "axios";
import { APIURL } from "../../config/apiConfig";
import axiosInstance from "../../utils/axiosInstance";
import { xAccessToken } from "../../utils/getAccessToken";

export class BookTrialService {
  bookTrialService(payload: any) {
    return axiosInstance.post(`/trial`, payload);
  }
}
