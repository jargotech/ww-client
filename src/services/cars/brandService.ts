import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class BrandService {
  getAllBrandList() {
    return axios.get(`${APIURL}/carMake`);
  }
}
