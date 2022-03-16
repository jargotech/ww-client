import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class CompanyDetail {
  getAllContactDetail() {
    return axios.get(`${APIURL}/contactDetail/623202048d85ac348ad4704c`);
  }
}
