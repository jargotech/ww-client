import axios from "axios";
import { APIURL } from "../../config/apiConfig";


export class FaqService{
    getAllFaq(){
      return  axios.get(`${APIURL}/faq`);
    }
}