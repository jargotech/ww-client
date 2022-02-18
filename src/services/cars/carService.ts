import axios from "axios";
import { APIURL } from "../../config/apiConfig";
import { xAccessToken } from "../../utils/getAccessToken";

export class CarService {
  async getAllCollection() {
    return axios.get(`${APIURL}/car/complete/car/detail`);
  }
  async getCarDetailById(carId: any) {
    return axios.get(`${APIURL}/car/completeCarDetailById/${carId}`);
  }
  async getAllBrands() {
    return axios.get(`${APIURL}/carMake`);
  }

  sellCar(payload: any) {
    return axios.post(`${APIURL}/sellCar`, payload, {
      headers: {
        "x-access-token": xAccessToken(),
      },
    });
  }

  bookTrial(payload: any) {
    return axios.post(`${APIURL}/trial`, payload, {
      headers: {
        "x-access-token": xAccessToken(),
      },
    });
  }
}
